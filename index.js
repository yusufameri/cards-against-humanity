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

app.get('/', (req, res) => {
  if(req.session.name) {
    res.json(`welcome: ${req.session.name}`)
  } else {
    req.session.name = "Yusuf"
    res.json(`welcome for the first time!`)
  }
});

io.on('connect', (client) => {
  console.log(`client connected: session(${client.handshake.sessionID}) socket.id(${client.id})`)

  client.on('getLobbyState', (partyCode, tellOthers) => {
    client.join(partyCode);
    let response = game.getLobbyState(partyCode, client.handshake.sessionID)
    client.emit("getLobbyState", response);
  });

  client.on('joinParty', ({ partyCode, name }) => {
    game.joinGame(partyCode, client.handshake.sessionID, name)
    io.to(partyCode).emit('newLobbyState');
  });

  client.on('getPlayerRoundState', (partyCode) => {
    let gameState = game.getPlayerRoundState(partyCode, client.handshake.sessionID)
    client.emit('getPlayerRoundState', gameState);
  });

  client.on('playCard', (partyCode, cardID) => {
    game.playCard(partyCode,cardID, client.handshake.sessionID);
    io.to(partyCode).emit('newGameState')
  });
});
