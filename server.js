/**
 * This is the server app script that is run on the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
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
var MobileDetect = require('mobile-detect');
var morgan = require('morgan');
var socketIO = require('socket.io');

var Game = require('./lib/Game');
var PairManager = require('./lib/PairManager');

// Initialization.
var app = express();
var server = http.Server(app);
var io = socketIO(server);

var game = Game.create();
var pairManager = PairManager.create();

app.set('port', PORT);
app.set('view engine', 'pug');

app.use(morgan(':date[web] :method :url :req[header] :remote-addr :status'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/shared', express.static(__dirname + '/shared'));

// Routing
app.get('/', function(request, response) {
  var device = new MobileDetect(request.headers['user-agent']);
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

app.get('/test', function(request, response) {
  response.render('mobile', {
    devMode: true
  });
});

// Server side input handler, modifies the state of the players and the
// game based on the input it receives. Everything runs asynchronously with
// the game loop.
io.on('connection', function(socket) {
  var device = new MobileDetect(socket.request.headers['user-agent']);

  socket.on('new-mobile', function(data, callback) {
    // if (device.mobile()) {
      pairManager.addMobile(socket.id, socket);
    // }
  });

  socket.on('new-desktop', function(data, callback) {
    if (!device.mobile()) {
      pairManager.addDesktop(socket.id, socket);
      callback(socket.id);
    }
  });

  socket.on('pair', function(data, callback) {
    // if (device.mobile()) {
      var desktopSocket = pairManager.pair(socket.id, data.id);
      if (desktopSocket) {
        desktopSocket.emit('paired');
        game.addNewPlayer(socket.id, desktopSocket);
        return callback({
          success: true
        });
      }
      return callback({
        success: false
      });
    // }
  });

  // Update the internal object states every time a player sends an intent
  // packet.
  socket.on('player-action', function(data) {
    // if (device.mobile()) {
      game.updatePlayerOnInput(socket.id, data);
    // }
  });

  // When a player disconnects, remove them from the game.
  socket.on('disconnect', function() {
    pairManager.remove(socket.id);
  });
});

// Server side game loop, runs at 60Hz and sends out update packets to all
// clients every tick.
setInterval(function() {
  game.update();
  game.sendState();
}, FRAME_RATE);

// Starts the server.
server.listen(PORT, function() {
  console.log('STARTING SERVER ON PORT ' + PORT);
  if (DEV_MODE) {
    console.log('DEVELOPMENT MODE ENABLED: SERVING UNCOMPILED JAVASCRIPT!');
  }
});
