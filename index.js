var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// open server
server.listen(80, () => {
  console.log("Listening on port 80")
});

// session
var session = require('express-session') // for express
var sharedsession = require("express-socket.io-session"); // for socket.io
var RedisStore = require('connect-redis')(session);
var uuidv1 = require("uuid/v1")

// create a redis client
var redis = require("redis"),
  client = redis.createClient();

// create a session
var iosession = session({
  store: new RedisStore({
    client,
  }),
  secret: 'keyboard cat',
  resave: false,
  genid: function () {
    return uuidv1() // use UUIDs for session IDs
  },
  name: "iosession"
});

app.use(iosession);

io.use(sharedsession(iosession, {autoSave:true}));

io.use((socket, next) => {
  console.log(`New User | ${socket.id} | ${++activeUsers}`)
  next()
});



app.get('/', (req, res) => res.send("Hello World"))

let players = {
  "abc123": ["Joeseph", "Steve"]
}

let activeUsers = 0;

//Debugging express
app.use('*', function(req, res, next) {
	console.log('Express `req.session` data is %j.', req.session);
	next();
});

io.use(function(socket, next) {
	console.log('socket.handshake session data is %j.', socket.handshake.session);
	next();
});

io.on('connection', (client) => {

  client.on('joinParty', ({ partyCode, name }) => {
    console.log(`${client.id} | joinParty | ${name} --<> ${partyCode}`)
    players[partyCode] = [...players[partyCode], (name)]
    io.to(partyCode).emit('joinedParty', { partyCode, name });
    io.to(partyCode).emit('getPartyPlayers', [...players[partyCode]])
  });

  client.on('getPartyPlayers', ({ partyCode }) => {
    console.log(`${client.id} | getPartyPlayers | ${partyCode}`)
    client.join(partyCode);
    if (players[partyCode]) {
      io.to(partyCode).emit('getPartyPlayers', [...players[partyCode]])
    } else {
      players[partyCode] = []
      io.to(partyCode).emit('getPartyPlayers', [...players[partyCode]])
    }
  });
});

