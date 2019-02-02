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
var RedisStore = require('connect-redis')(session); // for storing session data

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
io.use(sharedsession(iosession, { autoSave: true }));

app.get('/', (req, res) => {
  if (req.session.name) {
    res.json(`welcome: ${req.session.name}`)
  } else {
    req.session.name = "Yusuf"
    res.json(`welcome for the first time!`)
  }
});

io.on('connect', (client) => {
  console.log(`client connected: session(${client.handshake.sessionID})`)

  // StartGameScreen

  client.on('getLobbyState', (partyCode, tellOthers) => {
    client.join(partyCode);

    // place a cb for when the round timer finishes.
    let response = game.getLobbyState(partyCode, client.handshake.sessionID, (success, message) => {
      console.log(`Round ended, going to judge-selecting ${success} | ${message}`)
      io.to(partyCode).emit('newGameState');
    });
    client.emit("getLobbyState", response);
  });

  client.on('joinParty', ({ partyCode, name }) => {
    game.joinGame(partyCode, client.handshake.sessionID, name);
    io.to(partyCode).emit('newLobbyState');
  });

  // PlayerSelectionScreen

  client.on('getPlayerRoundState', (partyCode) => {
    console.log(`${client.handshake.sessionID} | getPlayerRoundState`)
    client.join(partyCode);
    let gameState = game.getPlayerRoundState(partyCode, client.handshake.sessionID);
    client.emit('getPlayerRoundState', gameState);
  });

  client.on('playCard', (partyCode, cardID) => {
    game.playCard(partyCode, cardID, client.handshake.sessionID, (success, message) => {
      console.log(`playCard | ${success} | ${message}`)
      if (success) {
        io.to(partyCode).emit('newGameState');
      }
    });
  });

  client.on('judgeSelectCard', (partyCode, cardID) => {
    game.judgeSelectCard(partyCode, cardID, client.handshake.sessionID, (success, message) => {
      console.log(`judgeSelectCard | ${success} | ${message} | ${client.handshake.sessionID}`)
      if (success) {
        io.to(partyCode).emit('newGameState')
      }
    })
  });

  client.on('endRound', partyCode => {
    game.endRound(partyCode, (success, message) => {
      console.log(`endRound | ${success} | ${message} | ${client.handshake.sessionID}`)
      if (success) {
        io.to(partyCode).emit('newGameState');
      }
    });
  });

  client.on('disconnect', function () {
    console.log(`client DISCONNECTED: session(${client.handshake.sessionID})`)
  });
});
