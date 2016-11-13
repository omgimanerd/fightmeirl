/**
 * Game class on the server to manage the state of existing players and
 * and entities.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var HashMap = require('hashmap');

var Player = require('./Player');

var Constants = require('../shared/Constants');
var Util = require('../shared/Util');

/**
 * Constructor for the server side Game class.
 * Instantiates the data structures to track all the objects
 * in the game.
 * @constructor
 */
function Game() {
  this.desktopSockets = new HashMap();
  this.players = new HashMap();
}

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
  this.players.get(id).updateOnInput(input);
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
  for (var player of this.players.values()) {
    player.update();
  }
};

/**
 * Sends the state of the game to all the connected sockets after
 * filtering them appropriately.
 */
Game.prototype.sendState = function(pairManager) {
  var context = this;
  this.desktopSockets.forEach(function(socket, mobileId) {
    socket.emit('update', {
      self: context.players.get(mobileId),
      players: context.players.values()
    });
  });
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Game;
