
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
  $('#A').on('touchstart', function(e) {
    InputHandler.PUNCH = true;
  });
  // $('#A').on('touchmove', function(e) {
  //   InputHandler.PUNCH = false;
  // });
  $('#A').on('touchend', function(e) {
    InputHandler.PUNCH = false;
  });
  $('#B').on('touchstart', function(e) {
    InputHandler.KICK = true;
  });
  // $('#B').on('touchmove', function(e) {
  //   InputHandler.KICK = false;
  // });
  $('#B').on('touchend', function(e) {
    InputHandler.KICK = false;
  });
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
