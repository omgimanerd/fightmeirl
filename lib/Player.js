/**
 * Stores the state of the player on the server. This class will also store
 * other important information such as socket ID, packet number, and latency.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var Entity = require('./Entity');
var World = require('./World');

var Util = require('../shared/Util');
var Constants = require('../shared/Constants');

function Player(x, y, facing, id) {
  this.x = x;
  this.y = y;
  this.ay = Player.GRAVITY;
  this.facing = facing;
  this.id = id;

  this.jumping = false;
  this.isPunching = false;
  this.isKicking = false;

  this.health = Player.MAX_HEALTH;

  this.kills = 0;
  this.deaths = 0;
}
require('../shared/base');
Player.inheritsFrom(Entity);

Player.MOVE_VELOCITY = 0.1;
Player.JUMP_VELOCITY = -2;
Player.GRAVITY = 0.01;

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

Player.prototype.updateOnInput = function(input) {
  if (input.left) {
    this.vx = Player.MOVE_VELOCITY;
  } else if (input.right) {
    this.vx = -Player.MOVE_VELOCITY;
  } else {
    this.vx = 0;
  }

  if (input.jump && !this.jumping) {
    this.vy = Player.JUMP_VELOCITY;
    this.jumping = true;
  }
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
  if (this.y >= Constants.WORLD_MAX) {
    this.vy = 0;
    this.jumping = false;
  }
  console.log(this.x, this.y);
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
Player.prototype.respawn = function() {
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
