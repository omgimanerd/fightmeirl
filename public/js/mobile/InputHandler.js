
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
  });
  $('#A').on('mouseup', function(e) {
    InputHandler.PUNCH = false;
  });
  $('#B').on('mousedown', function(e) {
    InputHandler.KICK = true;
  });
  $('#B').on('mouseup', function(e) {
    InputHandler.KICK = false;
  });
  $('#left').on('mousedown', function(e) {
    InputHandler.LEFT = true;
  });
  $('#left').on('mouseup', function(e) {
    InputHandler.LEFT = false;
  });
  $('#right').on('mousedown', function(e) {
    InputHandler.RIGHT = true;
  });
  $('#right').on('mouseup', function(e) {
    InputHandler.RIGHT = false;
  });
  $('#up').on('mousedown', function(e) {
    InputHandler.UP = true;
  });
  $('#up').on('mouseup', function(e) {
    InputHandler.UP = false;
  });
  $('#down').on('mousedown', function(e) {
    InputHandler.DOWN = true;
  });
  $('#down').on('mouseup', function(e) {
    InputHandler.DOWN = false;
  });
};
