/**
 * Wrapper class for all entities on the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var Constants = require('../shared/Constants');
var Util = require('../shared/Util');

/**
 * All entities will inherit from this class.
 * @constructor
 * @param {number} x The x coordinate of the entity.
 * @param {number} y The y coordinate of the entity.
 * @param {number} vx The velocity in the x direction of the entity.
 * @param {number} vy The velocity in the y direction of the entity.
 */
function Entity(x, y, vx, vy, ax, ay, hitboxSize) {
  this.x = x || 0;
  this.y = y || 0;
  this.vx = vx || 0;
  this.vy = vy || 0;
  this.ax = ax || 0;
  this.ay = ay || 0;
  this.hitboxSize = hitboxSize || 0;

  this.lastUpdateTime = 0;
  this.updateTimeDifference = 0;
}

/**
 * Used to determine if two entities have collided. This collision detection
 * method assumes all objects have circular hitboxes.
 * @param {number} x The x-coordinate of the center of the object's circular
 *   hitbox.
 * @param {number} y The y-coordinate of the center of the object's circular
 *   hitbox.
 * @param {number} hitboxSize The radius of the object's circular hitbox.
 * @return {boolean}
 */
Entity.prototype.isCollidedWith = function(x, y, hitboxSize) {
  var minDistance = this.hitboxSize + hitboxSize;
  return Util.getEuclideanDistance2(this.x, this.y, x, y) <
      (minDistance * minDistance);
};

/**
 * Returns true if this entity is visible to the given player.
 * @param {Player} player The player to check visibility to.
 * @return {boolean}
 */
Entity.prototype.isVisibleTo = function(player, threshold) {
  var vx = threshold[0];
  var vy = threshold[1];
  return Util.inBound(this.x, player.x - vx, player.x + vx) &&
      Util.inBound(this.y, player.y - vy, player.y + vy);
};

/**
 * Updates the entity's position based on its velocity according to
 * the amount of time the passed between this update and the last
 * update.
 */
Entity.prototype.update = function() {
  var currentTime = (new Date()).getTime();
  if (this.lastUpdateTime == 0) {
    this.updateTimeDifference = 0;
  } else {
    this.updateTimeDifference = currentTime - this.lastUpdateTime;
  }
  this.x += this.vx * this.updateTimeDifference;
  this.y += this.vy * this.updateTimeDifference;
  this.lastUpdateTime = currentTime;
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Entity;
