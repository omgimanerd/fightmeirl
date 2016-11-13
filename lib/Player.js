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

  this.lastKickTime = 0;
  this.lastKickProcessed = true;
  this.isKicking = false;

  this.health = Player.MAX_HEALTH;

  this.kills = 0;
  this.deaths = 0;
}
require('../shared/base');
Player.inheritsFrom(Entity);

Player.HEIGHT = 100;
Player.WIDTH = 50;

Player.MOVE_VELOCITY = 1;
Player.JUMP_VELOCITY = -2;
Player.GRAVITY = 0.01;
Player.DECELERATION = 0.02;

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
  } else {
    this.vx = 0;
  }

  if (input.jump && !this.jumping) {
    this.jumping = true;
  }

  if (input.punch && !this.isPunching && !this.isKicking) {
    this.isPunching = true;
    this.lastPunchProcessed = false;
  } else if (input.kick) {
    this.isKicking = true;
    this.lastKickProcessed = false;
  }
};

Player.prototype.canPunch = function(otherPlayer) {
  var punchPointX = this.x + (this.width * this.facing);
  var punchPointY = this.y - (this.height / 2);
  return otherPlayer.containsPoint(punchPointX, punchPointY);
};

Player.prototype.canKick = function(otherPlayer) {
  var kickPointX = this.x + (this.width * this.facing);
  var kickPointY = this.y + (this.height / 2);
  return otherPlayer.containsPoint(kickPointX, kickPointY);
}

Player.prototype.update = function(otherPlayers, platforms) {
  var currentTime = (new Date()).getTime();
  if (this.isPunching && !this.lastPunchProcessed) {
    this.lastPunchProcessed = true;
    this.lastPunchTime = currentTime;
    for (var player of otherPlayers) {
      if (this.canPunch(player)) {
        player.damage(1);
        player.vx = this.facing;
      }
    }
  }
  this.isPunching = currentTime < this.lastPunchTime +
    Player.ATTACK_ANIMATION_DURATION;
  this.isKicking = currentTime < this.lastKickTime +
    Player.ATTACK_ANIMATION_DURATION;

  var oldX = this.x;
  var oldY = this.y;
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
