
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
  $('#A').on('mousedown', function(e) {
    InputHandler.PUNCH = true;
    console.log('A');
  });
  $('#A').on('mouseup', function(e) {
    InputHandler.PUNCH = false;
    console.log('A');
  });
  $('#B').on('mousedown', function(e) {
    InputHandler.KICK = true;
    console.log('B');
  });
  $('#B').on('mouseup', function(e) {
    InputHandler.KICK = false;
    console.log('B');
  });
  $('#left').on('mousedown', function(e) {
    InputHandler.LEFT = true;
    console.log('left');
  });
  $('#left').on('mouseup', function(e) {
    InputHandler.LEFT = false;
    console.log('left');
  });
  $('#right').on('mousedown', function(e) {
    InputHandler.RIGHT = true;
    console.log('right');
  });
  $('#right').on('mouseup', function(e) {
    InputHandler.RIGHT = false;
    console.log('right');
  });
  $('#up').on('mousedown', function(e) {
    InputHandler.UP = true;
    console.log('up');
  });
  $('#up').on('mouseup', function(e) {
    InputHandler.UP = false;
    console.log('up');
  });
};
