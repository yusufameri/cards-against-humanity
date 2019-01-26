const io = require('socket.io')();

let players = {
  "abc123": ["Joeseph", "Steve"]
}

io.on('connection', (client) => {
  // client.on('subscribeToTimer', (interval) => {
  //   console.log('client is subscribing to timer with interval ', interval);
  //   console.log(client.id)
    
  //   setInterval(() => {
  //     client.emit('timer', new Date());
  //   }, interval);
  // });

  client.on('joinParty', ({partyCode, name}) => {
    console.log(`${name} --<> ${partyCode}`)
    players[partyCode] = [...players[partyCode], (name)]
    io.to(partyCode).emit('joinedParty', {partyCode, name});
    io.to(partyCode).emit('getPartyPlayers', [...players[partyCode]])
  });

  client.on('getPartyPlayers', ({partyCode}) => {
    console.log(`client ${client.id} wants to know the players in partyGroup ${partyCode}`)
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
