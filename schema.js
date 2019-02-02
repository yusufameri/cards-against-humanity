import _ from "lodash"
import Game from "./models/Game";

let games = {}

// call this function if game does not exists (in lobby)
// this will create an empty game
function getOrCreateGame(partyCode) {
  if (games[partyCode]) {
    // console.log(`get existing game | ${partyCode}`)
    return games[partyCode]
  }
  else {
    // console.log(`get NEW (create) game | ${partyCode}`)
    games[partyCode] = new Game(partyCode)
  }
  return games[partyCode]
}

export function joinGame(partyCode, sessionID, name) {
  let game = getOrCreateGame(partyCode)
  game.addNewPlayer(name, sessionID);
}

// returns the players in the game []
export function getLobbyState(partyCode, sessionID) {
  let game = getOrCreateGame(partyCode);
  let currentPlayer = game.getPlayer(sessionID)
  let players = _.map(game.players, (player) => player.name);

  let response = {
    players,
    currentPlayer: currentPlayer || null
  }
  return response;
}

export function getPlayerRoundState(partyCode, sessionID) {
  let game = getOrCreateGame(partyCode);
  return game.getPlayerRoundState(sessionID);
}

export function playCard(partyCode, cardID, sessionID, cb) {
  let game = getOrCreateGame(partyCode);
  game.playCard(sessionID, cardID, cb);
}

export function judgeSelectCard(partyCode, cardID, sessionID, cb) {
  let game = getOrCreateGame(partyCode);
  game.judgeSelectCard(sessionID, cardID, cb);
}

export function endRound(partyCode, cb) {
  let game = getOrCreateGame(partyCode);
  game.endRound(cb);
}
