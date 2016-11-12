/**
 * Game class on the server to manage the state of existing players and
 * and entities.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var HashMap = require('hashmap');

// var Player = require('./Player');

var Constants = require('../shared/Constants');
var Util = require('../shared/Util');

/**
 * Constructor for the server side Game class.
 * Instantiates the data structures to track all the objects
 * in the game.
 * @constructor
 */
function Game() {
  /**
   * This is a hashmap containing all the connected socket ids and socket
   * instances as well as the packet number of the socket and their latency.
   */
  this.clients = new HashMap();

  /**
   * This is a hashmap containing all the connected socket ids and the players
   * associated with them. This should always be parallel with sockets.
   */
  this.players = new HashMap();

  /**
   * These arrays contain entities in the game world. They do not need to be
   * stored in a hashmap because they do not have a unique id.
   * @type {Entity}
   */
  this.projectiles = [];
}

/**
 * Creates a new player with the given name and ID.
 * @param {string} name The display name of the player.
 * @param {Object} socket The socket object of the player.
 */
Game.prototype.addNewPlayer = function(name, socket) {
  // this.clients.set(socket.id, {
  //   socket: socket,
  //   latency: 0
  // });
  // this.players.set(socket.id, Player.generateNewPlayer(name, socket.id));
};

/**
 * Removes the player with the given socket ID and returns the name of the
 * player removed.
 * @param {string} id The socket ID of the player to remove.
 * @return {string}
 */
Game.prototype.removePlayer = function(id) {
  if (this.clients.has(id)) {
    this.clients.remove(id);
  }
  var player = {};
  if (this.players.has(id)) {
    player = this.players.get(id);
    this.players.remove(id);
  }
  return player.name;
};

/**
 * Returns the name of the player with the given socket id.
 * @param {string} id The socket id to look up.
 * @return {?string}
 */
Game.prototype.getPlayerNameBySocketId = function(id) {
  var player = this.players.get(id);
  if (player) {
    return player.name;
  }
  return null;
};

/**
 * Updates the player with the given ID according to the
 * input state sent by that player's client.
 * @param {string} id The socket ID of the player to update.
 * @param {Object} keyboardState The state of the player's keyboard.
 * @param {number} turretAngle The angle of the player's tank's turret
 *   in radians.
 * @param {boolean} shot The state of the player's left click determining
 *   if they shot.
 * @param {number} timestamp The timestamp of the packet sent.
 */
Game.prototype.updatePlayer = function(id, keyboardState, turretAngle,
                                       shot, timestamp) {
  var player = this.players.get(id);
  var client = this.clients.get(id);
  if (player) {
    player.updateOnInput(keyboardState, turretAngle);
    if (shot && player.canShoot()) {
      this.projectiles = this.projectiles.concat(
          player.getProjectilesShot());
    }
  }
  if (client) {
    client.latency = (new Date()).getTime() - timestamp;
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
};

/**
 * Sends the state of the game to all the connected sockets after
 * filtering them appropriately.
 */
Game.prototype.sendState = function() {
  var ids = this.clients.keys();
  for (var i = 0; i < ids.length; ++i) {
    var currentPlayer = this.players.get(ids[i]);
    var currentClient = this.clients.get(ids[i]);
    currentClient.socket.emit('update', {
      leaderboard: leaderboard,
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
