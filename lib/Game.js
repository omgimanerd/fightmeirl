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

  /**
   * These arrays contain entities in the game world. They do not need to be
   * stored in a hashmap because they do not have a unique id.
   * @type {Entity}
   */
  this.projectiles = [];
}

Game.prototype.addNewPlayer = function(mobileId, desktopSocket) {
  this.clients.set(mobileId, desktopSocket);
  this.players.set(mobileId, Player.createNewPlayer(mobileId));
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

Game.prototype.updatePlayer = function(id, keyboardState, turretAngle,
                                       shot, timestamp) {
  var player = this.players.get(id);
  var client = this.clients.get(id);
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
};

/**
 * Sends the state of the game to all the connected sockets after
 * filtering them appropriately.
 */
Game.prototype.sendState = function(pairManager) {
  var ids = this.clients.keys();
  for (var i = 0; i < ids.length; ++i) {
    var currentPlayer = this.players.get(ids[i]);
    var currentClient = this.clients.get(ids[i]);
    currentClient.socket.emit('update', {
      self: currentPlayer,
      players: this.players.values().filter(function(player) {
        // Filter out only the players that are visible to the current
        // player. Since the current player is also in this array, we will
        // remove the current player from the players packet and send it
        // separately.
        if (player.id == currentPlayer.id) {
          return false;
        }
        return player.isVisibleTo(currentPlayer);
      })
    });
  }
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Game;
