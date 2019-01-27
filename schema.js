// outline the schema 

// each document/row will look like:
let gameData = {
  partyCode: 'abc123',
  gameStartDate: new Date(),
  QCardDeck: [1,500],
  WCardDeck: [1,500],
  players: [
    {
      name: "Yusuf",
      cookie: 1, // some UID/session that will be stored in users browser for session tracking,
      cards: [1,45,21,12,68,32,12,68,32],
      roundsWon: 0
    },
    {
      name: "Salman",
      cookie: 2,
      cards: [3,51,221,24,8,31,23,81,92],
      roundsWon: 1
    },
    {
      name: "Reza",
      cookie: 4,
      cards: [2,71,251,31,48,93,13,111,94],
      roundsWon: 0,
    },
    {
      name: "Mostafa",
      cookie: 5,
      cards: [2,71,251,31,48,93,13,111,94],
      roundsWon: 0
    }
  ],
  rounds: [
    {
      roundNum: 1,
      active: false, // | false
      roundState: "winner-seen", //  | viewing-submissions | winner-seen
      roundStartTime: new Date(),
      roundEndTime: new Date(),
      roundJudge: "Yusuf",
      QCard: 99,
      cardsPlayed: [3,45,251],
      winningCard: 3,
      winner: "Salman", // | null
    },
    {
      roundNum: 2,
      active: true, // | false
      roundState: "players-selecting", //  | viewing-submissions | winner-seen
      roundStartTime: new Date(),
      roundEndTime: new Date(),
      roundJudge: "Mostafa",
      QCard: 33,
      cardsPlayed: [1],
      winningCard: null,
      winner: null, // | null
    }
  ]
}
