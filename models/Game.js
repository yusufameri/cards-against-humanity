import _ from "lodash"
import { getShuffledACard, getShuffledQCard } from "./Card"

class Game {
  constructor(partyCode) {
    this.partyCode = partyCode;
    this.gameStartDate = new Date();
    this.QCardDeck = getShuffledQCard().slice(0, 2);
    this.ACardDeck = getShuffledACard().slice(0, 9);
    this.players = {}
    this.rounds = []

    this.addNewPlayer = this.addNewPlayer.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.getLatestRound = this.getLatestRound.bind(this);
    this.getPlayerRoundState = this.getPlayerRoundState.bind(this);
  }

  // O(1)
  addNewPlayer({ name, sessionID }) {
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

  // O(1)
  // return the player in the game, if exists, else return null
  // helper
  getPlayer(sessionID) {
    return this.players[sessionID] ? this.players[sessionID] : null;
  }

  // O(1), assuming deck and player size are constant
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
      this.QCardDeck = _.shuffle(this.QCardDeck); // O(m), m is constant size of deck
      this.ACardDeck = _.shuffle(this.ACardDeck); // O(n), n is constant size of deck

      // O(k), k is constant size number of players
      let round = {
        active: true,
        roundNum: this.rounds.length + 1,
        roundState: "players-selecting", // judge-selecting | viewing-winner
        roundStartTime: new Date(),
        roundEndTime: null,
        roundJudge: _.find(this.players, player => player.pID === (this.rounds.length % _.size(this.players))), // O(k), k is constant size number of players
        QCard: _.take(this.QCardDeck), // O(1) get first card in QCardDeck
        cardsPlayed: [],
        winningCard: null,
        winner: null
      }
      this.rounds.push(round);
      return round;
    }
    else {
      console.log(`returning latest active round`)
      return this.rounds.slice(-1)[0] // O(1)
    }
  }

  // O(1)
  // return true if player with session id is round judge
  isRoundJudge(sessionID, round) {
    let player = this.getPlayer(sessionID)
    return round.roundJudge.pID === player.pID;
  }

  // O(1)
  // Return the round state for the player with given sessionID
  // TODO: This is broken! Needs refactoring!
  getPlayerRoundState(sessionID) {
    let player = this.getPlayer(sessionID) // O(1)
    if (player == null) return null; // O(1)

    // if rounds[roundNum].active, then return the roundState for that player;
    // 1. get latest round,
    let latestRound = this.getLatestRound() //O(1)

    // user is the judge
    if (this.isRoundJudge(sessionID, latestRound)) { //O(1)
      // TODO: return react state object based on player and current round state
      return {
        playerName: player.name,
        roundRole: 'judge',
        roundState: latestRound.roundState === 'players-selecting' ? 'judge-waiting' : 'judge-selecting',
        roundJudge: latestRound.roundJudge.name,
        roundNum: latestRound.roundNum,
        QCard: latestRound.QCard,
        cards: player.cards,
        otherPlayerCards: latestRound.cardsPlayed
      }
    }
    let playerRoundState;
    // user is a player
    if (_.find(latestRound.cardsPlayed, (card) => card.owner.pID === player.pID)) {
      if (latestRound.roundState === 'players-selecting') {
        playerRoundState = 'player-waiting'
      }
      else {
        playerRoundState = 'judge-selecting' // FIX: this should be accurate. Does not work when roundState is 'viewing-winner'
      }
    }
    else {
      playerRoundState = 'player-selecting'
    }
    // TODO: return react state object based on player and current round state
    return {
      roundNum: latestRound.roundNum,
      playerName: player.name,
      roundState: playerRoundState,
      roundJudge: latestRound.roundJudge.name,
      roundRole: 'player',
      QCard: latestRound.QCard,
      cards: player.cards,
      cardsPlayed: latestRound.cardsPlayed,
      winningCard: latestRound.winningCard,
      winner: latestRound.winner
    }
  }

  // O(1)
  playCard(sessionID, cardID) {
    let player = this.getPlayer(sessionID); // O(1)
    if (player == null) return; // TODO: add error logging with winston
    let card = _.find(player.cards, c => c.id === cardID) // O(1)
    let latestRound = this.getLatestRound() // O(1)
    if (latestRound.roundState != 'players-selecting') {
      console.log('Cannot play card!, judge is currently selecting!')
      return false;
    }
    if (this.isRoundJudge(sessionID, latestRound)) { // O(1)
      console.log(`${player.name} cannot play a card this round since they are the judge`)
      return false;
    }

    // if they own the cardID they want to play, play the card for the latest round
    if (card) {
      _.remove(player.cards, c => c.id === cardID) // O(1)
      latestRound.cardsPlayed.push({ ...card, owner: { "name": player.name, "pID": player.pID } }) // O(1)
      console.log(`${player.name} played card ${cardID}`)
      console.log(`${player.name} now has ${player.cards.length} cards`)
      return true;
    }
    else {
      console.log(`Player ${player.name}[${sessionID}] attempting to play card (${cardID}) they do not own! Hacker!`)
      return false;
    }
  }

  judgeSelectCard(sessionID, cardID) {
    // can only select card IFF
    // round-state === judge-selecting
    // player is current round judge
    // cardID choosen is among those in the round.cardsPlayed

    // AFTER a judge selects a card, do the following
    // set round.roundState = viewing-winner
    let latestRound = this.getLatestRound();
    if (this.isRoundJudge(sessionID, latestRound)) {
      let winningCard = _.find(latestRound.cardsPlayed, card => card.id === cardID);
      if (winningCard) {
        latestRound.roundState = 'viewing-winner';
        latestRound.winningCard = winningCard;
        latestRound.winner = winningCard.owner.name;
        latestRound.roundEndTime = new Date();
        // make player win that card
        let winningPlayer = _.find(this.players, player => player.pID === winningCard.owner.pID);
        // Add a copy of the ACard and QCard to the roundsWon of the winning player
        winningPlayer.roundsWon.push({
          roundNum: latestRound.roundNum,
          ACard: winningCard,
          QCard: latestRound.QCard
        })
        console.log(`${latestRound.winner} won with card ${latestRound.winningCard.text}`)
      }
      else {
        console.log(`Attempted to play a winning card ${cardID} that was not played!`)
      }
    }
    // set round.winningCard
    // set round.winner
    // set round.roundEndTime = new Date()
  }

  endRound() {
    // TODO
    // make a copy of the latestRound.cardsPlayed
    // remove the 'owners' property on the cards
    // place the cards back into the ACardDeck
    // give all of the players (except for the judge), a new ACard from the deck
    // 
    // set round.active = false -- only do this when the first player selects "Tap anywhere to continue"
    let latestRound = this.getLatestRound();
    latestRound.active = false;
  }

  shuffleCard(sessionID, srcCardIDIndex, destCardIDIndex) {
    // TODO
  }
}

export default Game;

// --------------------------------------------------------------------------------------------------------------------

let g = new Game("abc123")

// Yusuf Joins
g.addNewPlayer({ name: "Yusuf", sessionID: "yusufSession#123" });
g.addNewPlayer({ name: "Salman", sessionID: "salmanSession#456" });
g.addNewPlayer({ name: "Reza", sessionID: "rezaSession#456" });
console.log('1.------------------------------------------------------------------------')
console.log(g.getPlayerRoundState('yusufSession#123'))
console.log(g.getPlayerRoundState('salmanSession#456'))
console.log(g.getPlayerRoundState('rezaSession#456'))
console.log('2-------------------------------------------------------------------------')
// Yusuf Cannot play a card (since he is the judge)
let yusuf = g.getPlayer('yusufSession#123');
g.playCard('yusufSession#123', yusuf.cards[0].id)

// Salman cannot play a card that he does not own
let salman = g.getPlayer('salmanSession#456');
g.playCard('salmanSession#456', yusuf.cards[0].id)
// salman can only play a card that he owns
g.playCard('salmanSession#456', salman.cards[0].id)

// Reza plays a card
let reza = g.getPlayer('rezaSession#456');
g.playCard('rezaSession#456', reza.cards[0].id);

console.log(g.getPlayerRoundState('yusufSession#123'))
console.log(g.getPlayerRoundState('salmanSession#456'))
console.log(g.getPlayerRoundState('rezaSession#456'));

// Yusuf choose winning card
g.judgeSelectCard('yusufSession#123', g.getLatestRound().cardsPlayed[1].id);
console.log(g.getPlayerRoundState('rezaSession#456'))
// g.endRound();
// console.log(g.getPlayerRoundState('rezaSession#456'))
// g.endRound();
// console.log(g.getPlayerRoundState('rezaSession#456'))

