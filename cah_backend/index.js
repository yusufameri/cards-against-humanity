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

  client.on('joinParty', (data) => {
    console.log('User wants to join party: ', data)
    players[data.partyCode] = [...players[data.partyCode], (data.name)]
    client.emit('joinedParty', data);
    io.emit('getPartyPlayers', [...players[data.partyCode]])
  });

  client.on('getPartyPlayers', ({partyCode}) => {
    console.log(`client ${client.id} wants to know the players in partyGroup ${partyCode}`)
    if(players[partyCode]){
      client.emit('getPartyPlayers', [...players[partyCode]])
    } else {
      players[partyCode] = []
      client.emit('getPartyPlayers', [...players[partyCode]])
    }
  })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
