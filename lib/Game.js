/**
 * Game class on the server to manage the state of existing players and
 * and entities.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var HashMap = require('hashmap');

var Map = require('./Map');
var Player = require('./Player');

var Constants = require('../shared/Constants');
var Util = require('../shared/Util');

/**
 * Constructor for the server side Game class.
 * Instantiates the data structures to track all the objects
 * in the game.
 * @constructor
 */
function Game(platforms) {
  this.desktopSockets = new HashMap();

  this.players = new HashMap();

  this.platforms = platforms;
}

Game.create = function() {
  var platforms = Map.getPlatforms();
  return new Game(platforms);
};

Game.prototype.addNewPlayer = function(mobileId, desktopSocket) {
  this.desktopSockets.set(mobileId, desktopSocket);
  var player = Player.createNewPlayer(mobileId);
  this.players.set(mobileId, player);
};

/**
 * Removes the player with the given socket ID and returns the name of the
 * player removed.
 * @param {string} id The socket ID of the player to remove.
 * @return {string}
 */
Game.prototype.removePlayer = function(id) {
  this.clients.remove(id);
  this.players.remove(id);
};

Game.prototype.updatePlayerOnInput = function(id, input) {
  var player = this.players.get(id);
  if (player) {
    player.updateOnInput(input);
  }
};

/**
 * Returns an array of the currently active players.
 * @return {Array.<Player>}
 */
Game.prototype.getPlayers = function() {
  return this.players.values();
};

/**
 * Updates the state of all the objects in the game.
 */
Game.prototype.update = function() {
  for (var currentPlayer of this.players.values()) {
    currentPlayer.update(this.players.values().filter(function(player) {
      return currentPlayer.id != player.id;
    }));
  }
};

/**
 * Sends the state of the game to all the connected sockets after
 * filtering them appropriately.
 */
Game.prototype.sendState = function(pairManager) {
  var context = this;
  this.desktopSockets.forEach(function(socket, mobileId) {
    var currentPlayer = context.players.get(mobileId);
    socket.emit('update', {
      self: currentPlayer,
      players: context.players.values().filter(function(player) {
        return player.id != currentPlayer.id;
      }),
      platforms: context.platforms
    });
  });
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Game;
