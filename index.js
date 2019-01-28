var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var game = require("./schema")

// open server
server.listen(5000, () => {
  console.log("Listening on port 5000")
});

// session
var session = require('express-session') // for express
var sharedsession = require("express-socket.io-session"); // for socket.io
var RedisStore = require('connect-redis')(session);
// var uuidv1 = require("uuid/v1")

// create a redis client
var redis = require("redis"),
  client = redis.createClient();

// create a session
var iosession = session({
  store: new RedisStore({
    client,
  }),
  resave: true,
  saveUninitialized: true,
  secret: 'keyboard cat',
  name: "cah_cookie_session"
});

app.use(iosession);
io.use(sharedsession(iosession, {autoSave:true}));

// io.use((socket, next) => {
//   // console.log(`New User | ${socket.id} | ${++activeUsers}`)
//   console.log(`Socket.io socketID: ${socket.id}`)
//   console.log(`Socket.io session: ${JSON.stringify(socket.request.sessionID)}`)
//   next()
// });

app.get('/', (req, res) => {
  if(req.session.name) {
    res.json(`welcome: ${req.session.name}`)
  } else {
    req.session.name = "Yusuf"
    res.json(`welcome for the first time!`)
  }
})

let players = {
  "abc123": ["Joeseph", "Steve"]
}

let activeUsers = 0;

io.on('connection', (client) => {
  console.log(`client: ${client.handshake.sessionID}`)

  // console.log('players in party: ', getLobbyState("abc123", client.handshake.sessionID))

  // client.emit('setCookie', client.request.sessionID)
  // if(client.handshake.session.name) {
  //   client.emit('name', client.handshake.session.name)
  //   console.log(`go session for io: ${client.handshake.session.name}`)
  // } else {
  //   client.handshake.session.name = "jeff"
  //   client.handshake.session.save();
  //   console.log(`NO previious for io: `)
  //   client.emit('name', "noName!")
  // }

  client.on('getLobbyState', partyCode => {
    let response = game.getLobbyState(partyCode, client.handshake.sessionID)
    client.join(partyCode);
    io.to(partyCode).emit("getLobbyState", response);
  });

  client.on('joinParty', ({ partyCode, name }) => {
    // players[partyCode] = [...players[partyCode], (name)] // add player to party
    // io.to(partyCode).emit('getPartyPlayers', {players: [...players[partyCode]]}) // tell party of new player
    game.joinGame(partyCode, client.handshake.sessionID, name)
    let response = game.getLobbyState(partyCode, client.handshake.sessionID)
    io.to(partyCode).emit('getLobbyState', response)
  });

  // client.on('getPartyPlayers', ( partyCode ) => {
  //   // console.log(`${client.id} | getPartyPlayers | ${partyCode}`)
  //   client.join(partyCode);

  //   if(client.handshake.session.name) {} 
  //   else {

  //   }

  //   // client.handshake.session.name = "jeff"
  //   // client.handshake.session.save();
  //   // console.log(`session for request: ${client.handshake.session.name}`)
  //   if (players[partyCode]) {
  //     io.to(partyCode).emit('getPartyPlayers', {players: [...players[partyCode]], name: client.handshake.session.name}) 
  //   } else {
  //     players[partyCode] = []
  //     io.to(partyCode).emit('getPartyPlayers', {players: [...players[partyCode]]})
  //   }
  // });
});

