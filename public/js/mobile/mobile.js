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
        console.log(status);
        if (status.success) {

        }
      });
    }
  });

  setInterval(function() {

  }, 1000);
});
