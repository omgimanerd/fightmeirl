/**
 * This is the server app script that is run on the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 * TODO: Add unit tests!
 */

var DEV_MODE = false;
var IP = process.env.IP || 'localhost';
var FRAME_RATE = 1000.0 / 60.0;
var PORT = process.env.PORT || 5000;

/**
 * Sets the DEV_MODE constant for development.
 * Example usage:
 * node server.js --dev
 */
process.argv.forEach(function(value, index, array) {
  if (value == '--dev' || value == '--development') {
    DEV_MODE = true;
  }
});

// Dependencies.
var express = require('express');
var http = require('http');
var mobileDetect = require('mobile-detect');
var morgan = require('morgan');
var socketIO = require('socket.io');

// var Game = require('./lib/Game');

// Initialization.
var app = express();
var server = http.Server(app);
var io = socketIO(server);
// var game = new Game();

app.set('port', PORT);
app.set('view engine', 'pug');

app.use(morgan(':date[web] :method :url :req[header] :remote-addr :status'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/shared', express.static(__dirname + '/shared'));

// Routing
app.get('/', function(request, response) {
  var device = new mobileDetect(request.headers['user-agent']);
  if (device.mobile()) {
    response.render('mobile', {
      devMode: DEV_MODE
    });
  } else {
    response.render('desktop', {
      devMode: DEV_MODE
    });
  }
});

// Server side input handler, modifies the state of the players and the
// game based on the input it receives. Everything runs asynchronously with
// the game loop.
io.on('connection', function(socket) {
  // When a new player joins, the server adds a new player to the game.
  socket.on('new-player', function(data, callback) {
    // game.addNewPlayer(data.name, socket);
    // io.sockets.emit('chat-server-to-clients', {
    //   name: '[Tank Anarchy]',
    //   message: data.name + ' has joined the game.',
    //   isNotification: true
    // });
    callback();
  });

  // Update the internal object states every time a player sends an intent
  // packet.
  socket.on('player-action', function(data) {
    // game.updatePlayer(socket.id, data.keyboardState, data.turretAngle,
    //                   data.shot, data.timestamp);
  });

  // When a player disconnects, remove them from the game.
  socket.on('disconnect', function() {
    // var name = game.removePlayer(socket.id);
    // io.sockets.emit('chat-server-to-clients', {
    //   name: '[Tank Anarchy]',
    //   message: name + ' has left the game.',
    //   isNotification: true
    // });
  });
});

// Server side game loop, runs at 60Hz and sends out update packets to all
// clients every tick.
setInterval(function() {
  // game.update();
  // game.sendState();
}, FRAME_RATE);

// Starts the server.
server.listen(PORT, function() {
  console.log('STARTING SERVER ON PORT ' + PORT);
  if (DEV_MODE) {
    console.log('DEVELOPMENT MODE ENABLED: SERVING UNCOMPILED JAVASCRIPT!');
  }
});
