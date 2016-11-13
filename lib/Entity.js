/**
 * Wrapper class for all entities on the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var Constants = require('../shared/Constants');
var Util = require('../shared/Util');

function Entity(x, y, vx, vy, ax, ay, width, height) {
  this.x = x || 0;
  this.y = y || 0;
  this.vx = vx || 0;
  this.vy = vy || 0;
  this.ax = ax || 0;
  this.ay = ay || 0;

  this.width = width || 0;
  this.height = height || 0;

  this.lastUpdateTime = 0;
  this.deltaTime = 0;
}

Entity.prototype.containsPoint = function(x, y) {
  return Math.abs(this.x - x) < this.width / 2 &&
         Math.abs(this.y - y) < this.height / 2;
};

Entity.prototype.isCollidedWith = function(other) {
  return Math.abs(this.x - other.x) < (this.width + other.width) / 2 &&
         Math.abs(this.y - other.y) < (this.height + other.height) / 2;
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
    this.deltaTime = 0;
  } else {
    this.deltaTime = currentTime - this.lastUpdateTime;
  }
  var boundedCoord = World.bound(
    this.x + this.vx * this.deltaTime,
    this.y + this.vy * this.deltaTime);
  this.x = boundedCoord[0];
  this.y = boundedCoord[1];
  this.vx += this.ax * this.deltaTime;
  this.vy += this.ay * this.deltaTime;
  this.lastUpdateTime = currentTime;
};

/**
 * This line is needed on the server side since this is loaded as a module
 * into the node server.
 */
module.exports = Entity;
