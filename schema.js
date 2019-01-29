import _ from "lodash"
import Game from "./models/Game";

// outline the schema 
// each document/row will look like:
// let games = {
//   "abc123": {
//     partyCode: 'abc123',
//     gameStartDate: new Date(),
//     QCardDeck: [1, 500],
//     WCardDeck: [1, 500],
//     players: [
//       {
//         name: "Yusuf",
//         sessionID: '90ajaW3xIEeKNGlC2FbYAuvQUWnTRUgg', // some UID/session that will be stored in users browser for session tracking,
//         cards: [1, 45, 21, 12, 68, 32, 12, 68, 32],
//         roundsWon: 0
//       },
//       {
//         name: "Salman",
//         sessionID: 2,
//         cards: [3, 51, 221, 24, 8, 31, 23, 81, 92],
//         roundsWon: 1
//       },
//       {
//         name: "Reza",
//         sessionID: 4,
//         cards: [2, 71, 251, 31, 48, 93, 13, 111, 94],
//         roundsWon: 0,
//       },
//       {
//         name: "Mostafa",
//         sessionID: 5,
//         cards: [2, 71, 251, 31, 48, 93, 13, 111, 94],
//         roundsWon: 0
//       }
//     ],
//     rounds: [
//       {
//         roundNum: 1,
//         active: false, // | false
//         roundState: "winner-seen", //  | viewing-submissions | winner-seen
//         roundStartTime: new Date(),
//         roundEndTime: new Date(),
//         roundJudge: "Yusuf",
//         QCard: 99,
//         cardsPlayed: [3, 45, 251],
//         winningCard: 3,
//         winner: "Salman", // | null
//       },
//       {
//         roundNum: 2,
//         active: true, // | false
//         roundState: "players-selecting", //  | viewing-submissions | winner-seen
//         roundStartTime: new Date(),
//         roundEndTime: new Date(),
//         roundJudge: "Mostafa",
//         QCard: 33,
//         cardsPlayed: [1],
//         winningCard: null,
//         winner: null, // | null
//       }
//     ]
//   }
// }

let games = {}

// call this function if game does not exists (in lobby)
// this will create an empty game
function getOrCreateGame(partyCode) {
  if(games[partyCode]) {
    console.log(`get existing game | ${partyCode}`)
    return games[partyCode]
  } 
  else {
    console.log(`get NEW (create) game | ${partyCode}`)
    games[partyCode] = new Game(partyCode)
  }
  return games[partyCode]
}

// player plays card in the current round,
// player gets a new ACard (white card)
function playerPlayCard(partyCode, sessionID) {
  // TODO:
  // 
}

function judgeSelectCard(partyCode, sessionID) {
  // TODO:
  // winnerCard set for game
  // winner player set
  // active set to false
  // round state set to winner-seen
  // round end time recorded
  // return gameState
}

export function joinGame(partyCode, sessionID, name) {
  let game = getOrCreateGame(partyCode)
  game.addNewPlayer({name, sessionID});
}

// returns the players in the game []
export function getLobbyState(partyCode, sessionID) {
  console.log(`getLobbyState | ${partyCode} | ${sessionID}`)
  
  let game = getOrCreateGame(partyCode);
  let currentPlayer = game.getPlayer({sessionID})

  let players = _.map(game.players, (player) => player.name);

  let response = {}

  if (currentPlayer) {
    response = {
      players,
      currentPlayer
    }
  }
  else {
    response = {
      players,
      currentPlayer: null
    }
  }
  return response;
}
