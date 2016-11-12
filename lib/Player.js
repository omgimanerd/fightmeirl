/**
 * Stores the state of the player on the server. This class will also store
 * other important information such as socket ID, packet number, and latency.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var Entity = require('./Entity');
var World = require('./World');

var Util = require('../shared/Util');

function Player(x, y, facing, id) {
  this.x = x;
  this.y = y;
  this.facing = facing;
  this.id = id;

  this.vmag = 10;
  this.health = Player.MAX_HEALTH;

  this.hitboxSize = Player.DEFAULT_HITBOX_SIZE;

  this.kills = 0;
  this.deaths = 0;
}
require('../shared/base');
Player.inheritsFrom(Entity);

/**
 * DEFAULT_HITBOX_SIZE is in pixels.
 * @const
 * @type {number}
 */
Player.DEFAULT_HITBOX_SIZE = 20;

/**
 * MAX_HEALTH is in health units.
 * @const
 * @type {number}
 */
Player.MAX_HEALTH = 10;

/**
 * Returns a new Player object given a name and id.
 * @param {string} name The display name of the player.
 * @param {string} id The socket ID of the client associated with this
 *   player.
 * @return {Player}
 */
Player.createNewPlayer = function(id) {
  var point = World.getRandomPoint();
  var orientation = Util.randRange(0, 2 * Math.PI);
  return new Player(point[0], point[1], 1, id);
};

Player.prototype.updateOnInput = function() {
};

/**
 * Updates the player's position and powerup states, this runs in the 60Hz
 * server side loop so that powerups expire even when the player is not
 * moving or shooting.
 */
Player.prototype.update = function() {
  this.parent.update.call(this);

  var boundedCoord = World.bound(this.x, this.y);
  this.x = boundedCoord[0];
  this.y = boundedCoord[1];
};

/**
 * Returns an array containing projectiles that the player has fired,
 * factoring in all powerups. Assumes the shot cooldown has passed and the
 * player CAN shoot. Resets lastShotTime.
 * @return {Array.<Bullet>}
 */
Player.prototype.getProjectilesShot = function() {
};

/**
 * Returns a boolean determining if the player is dead or not.
 * @return {boolean}
 */
Player.prototype.isDead = function() {
  return this.health <= 0;
};

/**
 * Damages the player by the given amount.
 * @param {number} amount The amount to damage the player by.
 */
Player.prototype.damage = function(amount) {
  this.health -= amount;
};

/**
 *
 */
Player.prototype.respawn = function(players) {
  var point = World.getRandomPoint();
  this.x = point[0];
  this.y = point[1];
  this.health = Player.MAX_HEALTH;
  this.deaths++;
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Player;
