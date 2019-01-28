import openSocket from 'socket.io-client';
const socket = openSocket("localhost:5000");

function handleCookie(cb) {
  socket.on('setCookie', cookie => cb(cookie))
}

function joinParty({partyCode, name}, cb) {
  socket.emit('joinParty', {partyCode, name});
}

function getPartyPlayers(partyCode, cb) {
  console.log(`asking server for players in partyCode: ${partyCode}`)
  socket.emit('getPartyPlayers', partyCode);
  socket.on('getPartyPlayers', (data) => cb(data));
}

// get the lobby state for the partyCode
// --> {players=[string], joined=bool}
function getLobbyState(partyCode, cb) {
  socket.emit('getLobbyState', partyCode)
  socket.on('getLobbyState', (response) => cb(response));
}

export { joinParty , getPartyPlayers, handleCookie, getLobbyState};
