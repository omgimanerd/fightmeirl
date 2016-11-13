var numFrames;

function Animation(){
    //Don't fucking instantiate this
}

var BASE_IMG_URL = 'public/img/';
var GREEN_PUNCH_LEFT = ['green_attack_left_1.png','green_attack_left_2.png'];
var GREEN_PUNCH_RIGHT = ['green_attack_right_1.png','green_attack_right_2.png'];
var RED_PUNCH_LEFT = ['red_attack_left_1.png','red_attack_left_2.png'];
var RED_PUNCH_RIGHT = ['red_attack_right_1.png','red_attack_right_2'];
var GREEN_WALK_LEFT = ['green_run_left_0.png','green_run_left_1.png'];
var GREEN_WALK_RIGHT = ['green_run_right_0.png','green_run_right_1.png'];
var RED_WALK_LEFT = ['red_run_left_0.png','red_run_left_1.png'];
var RED_WALK_RIGHT = ['red_run_right_0.png','red_run_right_1.png'];
var GREEN_IDLE_LEFT = 'green_idle_left.png';
var GREEN_IDLE_RIGHT = 'green_idle_right.png';
var RED_IDLE_LEFT = 'red_idle_left.png';
var RED_IDLE_RIGHT = 'red_idle_right';
//Feel free to change this
var animTime = 30;

/*
 * Ok, so the idea is, you request a frame every (animationtime/2), and I just feed you that.
 * This way, I don't need to keep track of shit, animations take the same amount of time,
 * and all I need you to pass in is a framecount that is the percentage of the animation that is complete.
 * Basically, if you want an animation to take 15 frames, you should send me framecount%15/15.
 * That way, I know how far into the cycle we are.
 */
function getSprite(isSelf, isPunching, isKicking, orientation, xvel, frameCount){
    var index = Math.round(frameCount);
    //Am I myself? If so, paint green
    if(isSelf){
        //Am I facing right? If so, paint right
        if(orientation>0){
            //Am I punching? If so, paint punching
            if(isPunching){
                return BASE_IMG_URL + GREEN_PUNCH_RIGHT[index];
            }
            //Am I kicking? If so, paint kicking
            else if(isKicking){
                
            }
            //Am I moving? If so, paint walking
            else if(xvel!=0){
                return BASE_IMG_URL + GREEN_WALK_RIGHT[index];
            }
            //Am I doing nothing? If so, paint idle
            else{
                return BASE_IMG_URL + GREEN_IDLE_RIGHT;
            }
        }
        //Am I facing left? If so, paint left
        else if(orientation<0){
            
            if(isPunching){
                return BASE_IMG_URL + GREEN_PUNCH_LEFT[index];
            }
            //Am I kicking? If so, paint kicking
            else if(isKicking){
                
            }
            //Am I moving? If so, paint walking
            else if(xvel!=0){
                return BASE_IMG_URL + GREEN_WALK_LEFT[index];
            }
            //Am I doing nothing? If so, paint idle
            else{
                return BASE_IMG_URL + GREEN_IDLE_LEFT;
            }
        }
    }
    //Am I an enemy? If so, paint red.
    else{
        //Am I facing right? If so, paint right
        if(orientation>0){
            //Am I punching? If so, paint punching
            if(isPunching){
                return BASE_IMG_URL + RED_PUNCH_RIGHT[index];
            }
            //Am I kicking? If so, paint kicking
            else if(isKicking){
                
            }
            //Am I moving? If so, paint walking
            else if(xvel!=0){
                return BASE_IMG_URL + RED_WALK_RIGHT[index];
            }
            //Am I doing nothing? If so, paint idle
            else{
                return BASE_IMG_URL + RED_IDLE_RIGHT;
            }
        }
        //Am I facing left? If so, paint left
        else if(orientation<0){
            
            if(isPunching){
                return BASE_IMG_URL + RED_PUNCH_LEFT[index];
            }
            //Am I kicking? If so, paint kicking
            else if(isKicking){
                
            }
            //Am I moving? If so, paint walking
            else if(xvel!=0){
                return BASE_IMG_URL + RED_WALK_LEFT[index];
            }
            //Am I doing nothing? If so, paint idle
            else{
                return BASE_IMG_URL + RED_IDLE_LEFT;
            }
        }
    }
    
}