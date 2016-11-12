/**
 * Stores the state of the player on the server. This class will also store
 * other important information such as socket ID, packet number, and latency.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var World = require('./World');

var Util = require('../shared/Util');

/**
 * Constructor for a Player.
 * @constructor
 * @param {number} x X-coordinate to generate the player at.
 * @param {number} y Y-coordinate to generate the player at.
 * @param {number} orientation Direction to face the player from 0 to 2 * PI.
 * @param {string} name The display name of the player.
 * @param {string} id The socket ID of the client associated with this
 *   player.
 */
function Player(x, y, orientation, name, id) {
  this.x = x;
  this.y = y;
  this.orientation = orientation;
  this.turretAngle = orientation;
  this.name = name;
  this.id = id;

  /**
   * vmag represents the magnitude of the velocity and determines vx and vy
   * (inherited from Entity). turnRate is a rate of change for the orientation.
   */
  this.vmag = Player.DEFAULT_VELOCITY_MAGNITUDE;
  this.turnRate = 0;
  this.shotCooldown = Player.DEFAULT_SHOT_COOLDOWN;
  this.lastShotTime = 0;
  this.health = Player.MAX_HEALTH;
  /**
   * this.powerups is a JSON Object of the format:
   * { 'powerup' : { 'name' : name,
   *                 'data' : data,
   *                 'expirationTime' : expirationTime },
   *   'powerup' : { 'name' : name,
   *                 'data' : data,
   *                 'expirationTime' : expirationTime }
   * }
   */
  this.powerups = {};
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
 * SHIELD_HITBOX_SIZE is in pixels.
 * @const
 * @type {number}
 */
Player.SHIELD_HITBOX_SIZE = 45;

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
Player.generateNewPlayer = function(name, id) {
  var point = World.getRandomPoint();
  var orientation = Util.randRange(0, 2 * Math.PI);
  return new Player(point[0], point[1], orientation, name, id);
};

/**
 * Updates this player given the the client's keyboard state and mouse angle
 * for setting the tank turret.
 * @param {Object} keyboardState A JSON Object storing the state of the
 *   client keyboard.
 * @param {number} turretAngle The angle of the client's mouse with respect
 *   to the tank.
 */
Player.prototype.updateOnInput = function(keyboardState, turretAngle) {
  if (keyboardState.up) {
    this.vx = this.vmag * Math.sin(this.orientation);
    this.vy = -this.vmag * Math.cos(this.orientation);
  }
  if (keyboardState.down) {
    this.vx = -this.vmag * Math.sin(this.orientation);
    this.vy = this.vmag * Math.cos(this.orientation);
  }
  if (!keyboardState.up && !keyboardState.down) {
    this.vx = 0;
    this.vy = 0;
  }
  if (keyboardState.right) {
    this.turnRate = Player.TURN_RATE;
  }
  if (keyboardState.left) {
    this.turnRate = -Player.TURN_RATE;
  }
  if (!keyboardState.right && !keyboardState.left) {
    this.turnRate = 0;
  }

  this.turretAngle = turretAngle;
};

/**
 * Updates the player's position and powerup states, this runs in the 60Hz
 * server side loop so that powerups expire even when the player is not
 * moving or shooting.
 */
Player.prototype.update = function() {
  this.parent.update.call(this);
  this.orientation += this.turnRate * this.updateTimeDifference;

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
