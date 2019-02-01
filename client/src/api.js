import openSocket from 'socket.io-client';
const socket = openSocket("localhost:5000");

export function joinParty({partyCode, name}, cb) {
  socket.emit('joinParty', {partyCode, name});
}

export function getLobbyState(partyCode, cb) {
  socket.emit('getLobbyState', partyCode)
  socket.on('getLobbyState', (response) => cb(response));
}

export function newLobbyState(partyCode) {
  // whenever there is a newLobbyState, ask socket for new getLobbyState
  socket.on('newLobbyState', () => {
    socket.emit('getLobbyState', partyCode);
  });
}

export function getPlayerRoundState(partyCode, cb) {
  socket.emit('getPlayerRoundState', partyCode);
  socket.on('getPlayerRoundState', (roundState) => cb(roundState));
}

export function newGameState(partyCode) {
  socket.on('newGameState', () => {
    socket.emit('getPlayerRoundState', partyCode);
  })
}

export function playCard(partyCode, cardID) {
  socket.emit('playCard', partyCode, cardID)
}
