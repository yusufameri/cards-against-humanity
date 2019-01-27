const io = require('socket.io')();

let players = {
  "abc123": ["Joeseph", "Steve"]
}

let activeUsers = 0;

io.use((socket, next) => {
  console.log(`New User | ${socket.id} | ${++activeUsers}`)
  next()
});

io.on('connection', (client) => {
  client.on('joinParty', ({partyCode, name}) => {
    console.log(`${client.id} | joinParty | ${name} --<> ${partyCode}`)
    players[partyCode] = [...players[partyCode], (name)]
    io.to(partyCode).emit('joinedParty', {partyCode, name});
    io.to(partyCode).emit('getPartyPlayers', [...players[partyCode]])
  });

  client.on('getPartyPlayers', ({partyCode}) => {
    console.log(`${client.id} | getPartyPlayers | ${partyCode}`)
    client.join(partyCode);
    if(players[partyCode]){
      io.to(partyCode).emit('getPartyPlayers', [...players[partyCode]])
    } else {
      players[partyCode] = []
      io.to(partyCode).emit('getPartyPlayers', [...players[partyCode]])
    }
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
