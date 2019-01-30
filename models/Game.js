import _ from "lodash"
import {getShuffledACard, getShuffledQCard} from "./Card"

class Game {
  constructor(partyCode) {
    this.partyCode = partyCode;
    this.gameStartDate = new Date();
    this.QCardDeck = getShuffledQCard().slice(0,2);
    this.ACardDeck = getShuffledACard().slice(0,9);
    this.players = []
    this.rounds = []

    this.addNewPlayer = this.addNewPlayer.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.getLatestRound = this.getLatestRound.bind(this);
    this.getRoundState = this.getRoundState.bind(this);
  }

  addNewPlayer({ name, sessionID }) {
    if (name == undefined || sessionID == undefined) {
      console.log(`trying to addNewPlayer to ${this.partyCode}`)
    }
    else if(this.ACardDeck.length < 3) {
      console.log('Cannot add new player to deck, ACardDeck has ran out of cards!')
    }
    else {
      this.players.push({
        name,
        sessionID,
        roundsWon: 0,
        cards: this.ACardDeck.splice(0,3),
        roundState: "lobby"
      });
    }
  }

  getPlayer({ sessionID }) {
    return _.find(this.players, (player) => {
      return player.sessionID === sessionID
    });
  }

  // get the latest active round or create a new empty round (if its the first round, or )
  getLatestRound() {
    if(this.players.length < 3) {
      console.log("Cannot getLatestRound. not enough players to start a game")
      return
    }
    else if (this.rounds.length === 0 || !(this.rounds.slice(-1)[0].active)) {
      // shuffle the decks
      this.QCardDeck = _.shuffle(this.QCardDeck);
      this.ACardDeck = _.shuffle(this.ACardDeck);

      let round = {
        roundNum: this.rounds.length+1,
        active: true,
        roundState: "players-selecting", // judge-selecting | viewing-winner
        roundStartTime: new Date(),
        roundEndTime: null,
        roundJudge: this.players[this.rounds.length % this.players.length],
        QCard: _.take(this.QCardDeck), // get first card in QCardDeck
        cardsPlayed: [],
        winningCard: null,
        winner: null
      }
      this.rounds.push(round);
      return round;
    }
    else {
      console.log('Cannot/will not create a new round since the old one is still active')
      return this.rounds.slice(-1)[0]
    }
  }

  getRoundState(sessionID) {
    // if rounds[roundNum].active, then return the roundState for that player;
    // 1. get latest round,
    let latestRound = this.getLatestRound()
    
    // user is the judge
    if(latestRound.roundJudge.sessionID === sessionID) {
      // TODO: return react state object based on player and current round state
    }
    // user is a player
    else {
      // TODO: return react state object based on player and current round state
    }
  }
}

export default Game;

let g = new Game("abc123")

// Yusuf Joins
g.addNewPlayer({name: "Yusuf", sessionID:"yusufSession#123"});
g.addNewPlayer({name: "Salman", sessionID:"salmanSession#456"});
g.addNewPlayer({name: "Reza", sessionID:"rezaSession#456"});
g.getLatestRound()

console.log(g)
