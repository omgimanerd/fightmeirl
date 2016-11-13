/**
 * @fileoverview Animation
 */

function Animation(images) {
  this.images = images;
}

Animation.create = function() {
  var images = {};
  for (var animation in Animation.IMG_URLS) {
    images[animation] = [];
    for (var imageUrl of Animation.IMG_URLS[animation]) {
      var image = new Image();
      image.src = Animation.BASE_IMG_URL + imageUrl;
      images[animation].push(image);
    }
  }
  return new Animation(images);
}

Animation.BASE_IMG_URL = '/public/img/';

Animation.IMG_URLS = {
  GREEN_PUNCH_LEFT: ['green_attack_left_1.png','green_attack_left_2.png'],
  GREEN_PUNCH_RIGHT: ['green_attack_right_1.png','green_attack_right_2.png'],
  RED_PUNCH_LEFT: ['red_attack_left_1.png','red_attack_left_2.png'],
  RED_PUNCH_RIGHT: ['red_attack_right_1.png','red_attack_right_2.png'],
  GREEN_WALK_LEFT: ['green_run_left_0.png','green_run_left_1.png'],
  GREEN_WALK_RIGHT: ['green_run_right_0.png','green_run_right_1.png'],
  RED_WALK_LEFT: ['red_run_left_0.png','red_run_left_1.png'],
  RED_WALK_RIGHT: ['red_run_right_0.png','red_run_right_1.png'],
  GREEN_IDLE_LEFT: ['green_idle_left.png'],
  GREEN_IDLE_RIGHT: ['green_idle_right.png'],
  RED_IDLE_LEFT: ['red_idle_left.png'],
  RED_IDLE_RIGHT: ['red_idle_right.png']
};

Animation.ANIMATION_TIME = 30;

/*
 * Ok, so the idea is, you request a frame every (animationtime/2), and I just feed you that.
 * This way, I don't need to keep track of shit, animations take the same amount of time,
 * and all I need you to pass in is a framecount that is the percentage of the animation that is complete.
 * Basically, if you want an animation to take 15 frames, you should send me framecount%15/15.
 * That way, I know how far into the cycle we are.
 */
/**
 * Returns the Image object needing to be drawn.
 * @param {Boolean} isSelf [description]
 * @param {Boolean} isPunching [description]
 * @param {Boolean} isKicking [description]
 * @param {[type]} facing [description]
 * @param {[type]} vx [description]
 * @param {[type]} animationPercent [description]
 * @return {[type]}
 */
Animation.prototype.getSprite = function(isSelf, isPunching, isKicking,
                                         facing, vx, animationPercent) {
  var animationSet = null;
  console.log(arguments);
  //Am I myself? If so, paint green
  if (isSelf){
    //Am I facing right? If so, paint right
    if (facing > 0){
      //Am I punching? If so, paint punching
      if (isPunching) {
        animationSet = this.images['GREEN_PUNCH_RIGHT'];
      } else if (isKicking) {
        //Am I kicking? If so, paint kicking
        animationSet = this.images['GREEN_IDLE_RIGHT'];
      } else if (vx != 0) {
        //Am I moving? If so, paint walking
        animationSet = this.images['GREEN_WALK_RIGHT'];
      } else {
        //Am I doing nothing? If so, paint idle
        animationSet = this.images['GREEN_IDLE_RIGHT'];
      }
    } else if (facing < 0) {
      //Am I facing left? If so, paint left
      if (isPunching) {
        animationSet = this.images['GREEN_PUNCH_LEFT'];
      } else if (isKicking) {
        //Am I kicking? If so, paint kicking
        animationSet = this.images['GREEN_IDLE_LEFT'];
      } else if (vx != 0) {
        //Am I moving? If so, paint walking
        animationSet = this.images['GREEN_WALK_LEFT'];
      } else {
        //Am I doing nothing? If so, paint idle
        animationSet = this.images['GREEN_IDLE_LEFT'];
      }
    }
  } else {
    //Am I an enemy? If so, paint red.
    //Am I facing right? If so, paint right
    if (facing > 0) {
      //Am I punching? If so, paint punching
      if (isPunching) {
        animationSet = this.images['RED_PUNCH_RIGHT'];
      } else if(isKicking){
        //Am I kicking? If so, paint kicking
        animationSet = this.images['RED_IDLE_RIGHT'];
      } else if (vx != 0) {
        //Am I moving? If so, paint walking
        animationSet = this.images['RED_WALK_RIGHT'];
      } else {
        //Am I doing nothing? If so, paint idle
        animationSet = this.images['RED_IDLE_RIGHT'];
      }
    } else if (facing < 0) {
      //Am I facing left? If so, paint left
      if (isPunching) {
        animationSet = this.images['RED_PUNCH_LEFT'];
      } else if (isKicking) {
        //Am I kicking? If so, paint kicking
        animationSet = this.images['RED_IDLE_LEFT'];
      } else if (vx != 0) {
        //Am I moving? If so, paint walking
        animationSet = this.images['RED_WALK_LEFT'];
      } else {
        //Am I doing nothing? If so, paint idle
        animationSet = this.images['RED_IDLE_LEFT'];
      }
    }
  }
  console.log(animationSet);
  return animationSet[Math.floor(animationPercent * animationSet.length)];
};
