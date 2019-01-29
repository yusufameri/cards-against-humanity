import openSocket from 'socket.io-client';
const socket = openSocket("localhost:5000");

function joinParty({partyCode, name}, cb) {
  socket.emit('joinParty', {partyCode, name});
}

function getLobbyState(partyCode, cb) {
  socket.emit('getLobbyState', partyCode)
  socket.on('getLobbyState', (response) => cb(response));
}

export { joinParty , getLobbyState};
