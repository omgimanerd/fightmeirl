/**
 * Client side script that initializes the game. This should be the only script
 * that depends on JQuery.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

$(document).ready(function() {
  var socket = io();

  socket.emit('new-mobile');

  $('#connect').on('keydown', function(event) {
    if (event.keyCode == 13) {
      socket.emit('pair', {
        id: $('#connect').val()
      }, function(status) {
        if (status.success) {
          $('#front').hide();
          InputHandler.apply();
          setInterval(function() {
            socket.emit('player-action', {
              left: InputHandler.LEFT,
              right: InputHandler.RIGHT,
              jump: InputHandler.UP,
              punch: InputHandler.PUNCH,
              kick: InputHandler.KICK
            });
          }, 1000 / 60);
        } else {
          window.alert('Unable to pair to ' + $('#connect').val());
        }
      });
    }
  });
});
