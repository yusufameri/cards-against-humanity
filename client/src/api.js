import openSocket from 'socket.io-client';
const socket = openSocket('http://192.168.1.2');

function joinParty({name, partyCode}, cb) {
  socket.emit('joinParty', {partyCode, name});
  socket.on('joinedParty', data => cb(null, data));
}

function getPartyPlayers({partyCode}, cb) {
  console.log(`asking server for players in partyCode: ${partyCode}`)
  socket.emit('getPartyPlayers', {partyCode});
  socket.on('getPartyPlayers', players => cb(players));
}

export { joinParty , getPartyPlayers};
