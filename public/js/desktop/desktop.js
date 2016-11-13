/**
 * Client side script that initializes the game. This should be the only script
 * that depends on JQuery.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

$(document).ready(function() {
  var socket = io();
  var game = Game.create(socket, document.getElementById('canvas'));

  socket.emit('new-desktop', null, function(id) {
    $('.id').text(id.substring(0, 6));
  });

  socket.on('paired', function(data) {
    $('.id-panel').hide();
    game.animate();
  });
});
