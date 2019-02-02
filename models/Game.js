import _ from "lodash"
import { getShuffledACard, getShuffledQCard } from "./Card"

class Game {
  constructor(partyCode, roundLength = 15) {
    this.partyCode = partyCode;
    this.gameStartDate = new Date();
    this.QCardDeck = getShuffledQCard().slice(0, 2);
    this.ACardDeck = getShuffledACard().slice(0, 9);
    this.players = {};
    this.rounds = [];
    this.roundLength = roundLength;

    this.addNewPlayer = this.addNewPlayer.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.getLatestRound = this.getLatestRound.bind(this);
    this.getPlayerRoundState = this.getPlayerRoundState.bind(this);
  }

  addNewPlayer( name, sessionID ) {
    if (name == undefined || sessionID == undefined) {
      console.log(`trying to addNewPlayer to ${this.partyCode}`)
    }
    else if (this.ACardDeck.length < 3) { // remove this
      console.log('Cannot add new player to deck, ACardDeck has ran out of cards!')
    }
    else {
      this.players[sessionID] = {
        name,
        pID: _.size(this.players),
        roundsWon: [],
        cards: this.ACardDeck.splice(0, 3),
        roundState: "lobby"
      };
    }
  }

  // return the player in the game, if exists, else return null
  // helper
  getPlayer(sessionID) {
    return this.players[sessionID] ? this.players[sessionID] : null;
  }

  // get the latest active round or create a new empty round (if its the first round, or )
  // O(max(m,n,k)), m=size QCardDeck, n=size ACardDeck, k=# of players
  getLatestRound() {
    if (_.size(this.players) < 3) { // O(1)
      console.log("Cannot getLatestRound. not enough players to start a game")
      return
    }
    else if (this.rounds.length === 0 || !(this.rounds.slice(-1)[0].active)) { // O(1)
      console.log('creating new round, since old round was not active (or this is the first round)')
      // shuffle the decks
      this.QCardDeck = _.shuffle(this.QCardDeck);
      this.ACardDeck = _.shuffle(this.ACardDeck);

      let round = {
        active: true,
        roundNum: this.rounds.length + 1,
        roundState: "players-selecting",
        roundStartTime: new Date(),
        roundEndTime: null,
        roundJudge: _.find(this.players, player => player.pID === (this.rounds.length % _.size(this.players))), // O(k), k is constant size number of players
        QCard: _.take(this.QCardDeck),
        otherPlayerCards: [],
        winningCard: null,
        winner: null,
      }
      
      setTimeout(() => {
        round.roundState = 'judge-selecting'
        console.log('Judge-selection time!')
      }, this.roundLength * 1000);

      this.rounds.push(round);
      return round;
    }
    else {
      console.log(`returning latest active round`)
      return this.rounds.slice(-1)[0] // O(1)
    }
  }

  // return true if player with session id is round judge
  isRoundJudge(sessionID, round) {
    let player = this.getPlayer(sessionID);
    return player && round.roundJudge.pID === player.pID;
  }

  // Return the round state for the player with given sessionID
  getPlayerRoundState(sessionID) {
    let player = this.getPlayer(sessionID)
    if (player == null) return null;
    let latestRound = this.getLatestRound()
    let roundRole = this.isRoundJudge(sessionID, latestRound) ? 'judge' : 'player'
    let playerChoice = _.find(latestRound.otherPlayerCards, card => card.owner.pID === player.pID) || null;
    let otherPlayerCards = latestRound.otherPlayerCards;
    let cards = player.cards;
    let QCard = latestRound.QCard;
    let roundNum = latestRound.roundNum;
    let roundJudge = latestRound.roundJudge.name;
    let winningCard = latestRound.winningCard;
    let winner = latestRound.winner;
    let timeLeft = _.max([0, _.floor(this.roundLength - ((new Date() - latestRound.roundStartTime) / 1000))]); // timeRemaining in seconds

    let roundState;
    if (latestRound.roundState === 'judge-selecting' || latestRound.roundState === 'viewing-winner') {
      roundState = latestRound.roundState
    }
    else if (roundRole == 'judge') {
      roundState = 'judge-waiting'
    }
    else if (playerChoice) {
      roundState = 'player-waiting'
    }
    else {
      roundState = 'player-selecting'
    }

    return {
      roundState,
      roundRole,
      roundJudge,
      roundNum,
      QCard,
      cards,
      otherPlayerCards,
      playerChoice,
      winningCard,
      winner,
      timeLeft
    }
  }

  playCard(sessionID, cardID, cb) {
    let player = this.getPlayer(sessionID);
    if (player == null) return;
    let card = _.find(player.cards, c => c.id === cardID)
    let latestRound = this.getLatestRound()

    if (latestRound.roundState != 'players-selecting') {
      cb(false, "Cannot play card!, judge is currently selecting!")
    }
    else if (this.isRoundJudge(sessionID, latestRound)) {
      cb(false, `${player.name} cannot play a card this round since they are the judge`)
    }

    // if they own the cardID they want to play, play the card for the latest round
    if (card) {
      _.remove(player.cards, c => c.id === cardID)
      latestRound.otherPlayerCards.push({ ...card, owner: { "name": player.name, "pID": player.pID } })
      if(latestRound.otherPlayerCards.length === this.players.length - 1) {
        latestRound.roundState = 'judge-selecting'
        cb(true, 'all playyers have played their cards, going to judge-selecting!')
      } else {
        cb(true, `${player.name} played their card!`)
      }
    }
    else {
      cb(false, `Player ${player.name}[${sessionID}] attempting to play card (${cardID}) they do not own! Hacker!`)
    }
  }

  judgeSelectCard(sessionID, cardID, cb) {
    let latestRound = this.getLatestRound();
    if (this.isRoundJudge(sessionID, latestRound) && latestRound.roundState === 'judge-selecting') {
      let winningCard = _.find(latestRound.otherPlayerCards, card => card.id === cardID);
      if (winningCard) {
        latestRound.roundState = 'viewing-winner';
        latestRound.winningCard = winningCard;
        latestRound.winner = winningCard.owner.name;
        latestRound.roundEndTime = new Date();
        let winningPlayer = _.find(this.players, player => player.pID === winningCard.owner.pID);
        winningPlayer.roundsWon.push({
          roundNum: latestRound.roundNum,
          ACard: winningCard,
          QCard: latestRound.QCard
        });
        cb(true, `${latestRound.winner} won with card ${latestRound.winningCard.text}`)
      }
      else {
        cb(false, `Attempted to play a winning card ${cardID} that was not played!`)
      }
    }
    else {
      cb(false, 'you are not the round judge! you cannot choose the winner!')
    }
  }

  endRound(cb) {
    // TODO
    // make a copy of the latestRound.otherPlayerCards
    // remove the 'owners' property on the cards
    // place the cards back into the ACardDeck
    // give all of the players (except for the judge), a new ACard from the deck
    // 
    // set round.active = false -- only do this when the first player selects "Tap anywhere to continue"
    let latestRound = this.getLatestRound();
    // let obj = {}
    // let otherPlayerCardsCopy = Object.assign({}, obj, ...(latestRound.otherPlayerCards))
    // otherPlayerCardsCopy = _.map(otherPlayerCardsCopy, card => card.owner = undefined)
    // console.log('Removing owners', otherPlayerCardsCopy)
    if(latestRound) {
      latestRound.active = false;
      cb(true, `Round ${latestRound.roundNum} successfully finished`)
    }
    else {
      cb(false, `Cannot endRound, since no rounds exist for the following game!`)
    }
  }

  shuffleCard(sessionID, srcCardIDIndex, destCardIDIndex) {
    // TODO
  }
}

export default Game;

// --------------------------------------------------------------------------------------------------------------------

// let g = new Game("abc123")

// // Yusuf Joins
// g.addNewPlayer({ name: "Yusuf", sessionID: "yusufSession#123" });
// g.addNewPlayer({ name: "Salman", sessionID: "salmanSession#456" });
// g.addNewPlayer({ name: "Reza", sessionID: "rezaSession#456" });
// console.log('1.------------------------------------------------------------------------')
// console.log(g.getPlayerRoundState('yusufSession#123'))
// console.log(g.getPlayerRoundState('salmanSession#456'))
// console.log(g.getPlayerRoundState('rezaSession#456'))
// console.log('2-------------------------------------------------------------------------')
// // Yusuf Cannot play a card (since he is the judge)
// let yusuf = g.getPlayer('yusufSession#123');
// g.playCard('yusufSession#123', yusuf.cards[0].id)

// // Salman cannot play a card that he does not own
// let salman = g.getPlayer('salmanSession#456');
// g.playCard('salmanSession#456', yusuf.cards[0].id)
// // salman can only play a card that he owns
// g.playCard('salmanSession#456', salman.cards[0].id)

// // Reza plays a card
// let reza = g.getPlayer('rezaSession#456');
// g.playCard('rezaSession#456', reza.cards[0].id);

// console.log('3-------------------------------------------------------------------------')
// console.log(g.getPlayerRoundState('yusufSession#123'))
// console.log(g.getPlayerRoundState('salmanSession#456'))
// console.log(g.getPlayerRoundState('rezaSession#456'));

// // Yusuf choose winning card
// setTimeout(() => {
//   console.log("Choosing the winner!")
//   g.judgeSelectCard('yusufSession#123', g.getLatestRound().otherPlayerCards[1].id);
//   console.log(g.getPlayerRoundState('rezaSession#456'))
//   g.endRound();
// }, 7000)
// // console.log(g.getPlayerRoundState('rezaSession#456'))
// // g.endRound();
// // console.log(g.getPlayerRoundState('rezaSession#456'))
