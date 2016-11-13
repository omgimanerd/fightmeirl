
function InputHandler() {
  throw new Error('InputHandler should not be instantiated!');
}

InputHandler.PUNCH = false;
InputHandler.KICK = false;
InputHandler.LEFT = false;
InputHandler.RIGHT = false;
InputHandler.UP = false;
InputHandler.DOWN = false;

InputHandler.apply = function(){
  if(window.DeviceMotionEvent){
      window.addEventListener('devicemotion', deviceMotionHandler, false);
      function deviceMotionHandler(event){
        if(event.accelerationIncludingGravity.x>25){InputHandler.PUNCH = true;}
        else{InputHandler.PUNCH = false;}
      }
  }
  $('#left').on('touchstart', function(e) {
    InputHandler.LEFT = true;
  });
  $('#left').on('touchend', function(e) {
    InputHandler.LEFT = false;
  });
  // $('#left').on('touchmove', function(e) {
  //   InputHandler.LEFT = false;
  // });
  $('#right').on('touchstart', function(e) {
    InputHandler.RIGHT = true;
  });
  $('#right').on('touchend', function(e) {
    InputHandler.RIGHT = false;
  });
  // $('#right').on('touchmove', function(e) {
  //   InputHandler.RIGHT = false;
  // });
  $('#up').on('touchstart', function(e) {
    InputHandler.UP = true;
  });
  $('#up').on('touchend', function(e) {
    InputHandler.UP = false;
  });
  // $('#up').on('touchmove', function(e) {
  //   InputHandler.UP = false;
  // });
};
