import _ from "lodash"

class Game {
  constructor(partyCode) {
    this.partyCode = partyCode,
    this.gameStartDate = new Date(),
    this.QCardDeck = [...Array(5).keys()];
    this.ACardDeck = [...Array(5).keys()];
    this.players = []
    this.rounds = []
  }

  addNewPlayer({name, sessionID}) {
    if(name == undefined || sessionID == undefined) {
      console.log(`trying to addNewPlayer to ${this.partyCode}`)
    }
    this.players.push({
      name,
      sessionID,
      roundsWon: 0,
      cards: []
    });
  }

  getPlayer({sessionID}) {
    return _.find(this.players, (player) => {
      return player.sessionID === sessionID
    }); 
  }
}

export default Game;
