/**
 * Stores the state of the player on the server. This class will also store
 * other important information such as socket ID, packet number, and latency.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var Entity = require('./Entity');
var World = require('./World');

var Util = require('../shared/Util');
var Constants = require('../shared/Constants');

function Player(x, y, id) {
  this.x = x;
  this.y = y;
  this.ay = Player.GRAVITY;
  this.facing = 1;
  this.id = id;

  this.width = Player.WIDTH;
  this.height = Player.HEIGHT;

  this.jumping = false;

  this.lastPunchTime = 0;
  this.lastPunchProcessed = true;
  this.isPunching = false;

  this.screamPower = 1;

  this.health = Player.MAX_HEALTH;

  this.kills = 0;
  this.deaths = 0;
}
require('../shared/base');
Player.inheritsFrom(Entity);

Player.HEIGHT = 100;
Player.WIDTH = 50;

Player.MOVE_VELOCITY = 0.4;
Player.JUMP_VELOCITY = -1.5;
Player.GRAVITY = 0.008;
Player.DECELERATION = 0.04;
Player.SCREAM_DECAY = 0.1;

Player.MAX_HEALTH = 10;

Player.ATTACK_ANIMATION_DURATION = 500;

Player.createNewPlayer = function(id) {
  var point = World.getRandomPoint();
  return new Player(point[0], point[1], id);
};

Player.prototype.updateOnInput = function(input) {
  if (input.left) {
    this.vx = -Player.MOVE_VELOCITY;
    this.facing = -1;
  } else if (input.right) {
    this.vx = Player.MOVE_VELOCITY;
    this.facing = 1;
  }

  if (input.jump && !this.jumping) {
    this.vy = Player.JUMP_VELOCITY;
    this.jumping = true;
  }

  if (input.punch && !this.isPunching && !this.isKicking) {
    this.isPunching = true;
    this.lastPunchProcessed = false;
  }

  if (input.scream > 0.2) {
    this.screamPower = Math.max(5, this.screamPower + 0.3);
  }
};

Player.prototype.update = function(otherPlayers, platforms) {
  var currentTime = (new Date()).getTime();
  if (this.isPunching && !this.lastPunchProcessed) {
    this.lastPunchProcessed = true;
    this.lastPunchTime = currentTime;
    for (var player of otherPlayers) {
      if (this.isCollidedWith(player)) {
        player.damage(this.screamPower);
        player.vx = this.facing * this.screamPower;
        this.screamPower -= 2.5;
        console.log(this.screamPower);
        if (player.isDead()) {
          player.respawn();
        }
      }
    }
  }
  this.isPunching = currentTime < this.lastPunchTime +
    Player.ATTACK_ANIMATION_DURATION;
  var oldX = this.x;
  var oldY = this.y;
  if (this.vx > 0) {
    this.vx = Math.max(0, this.vx - Player.DECELERATION);
  } else if (this.vx < 0) {
    this.vx = Math.min(0, this.vx + Player.DECELERATION);
  }
  this.parent.update.call(this);
  for (var platform of platforms) {
    if (this.isCollidedWith(platform)) {
      if (this.vy >= 0) {
        this.vy = 0;
        this.jumping = false;
      }
      this.y = oldY;
    }
  }
  this.screamPower = Math.max(1, this.screamPower - Player.SCREAM_DECAY);
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
  this.health = Math.max(0, this.health - amount);
};

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
