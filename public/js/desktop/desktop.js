/**
 * Client side script that initializes the game. This should be the only script
 * that depends on JQuery.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

$(document).ready(function() {
  var socket = io();

  socket.emit('new-desktop', null, function(id) {
    $('.id').text(id);
  });

  socket.on('paired', function(data) {
    console.log('paired');
    var game = Game.create(
      socket, document.getElementById('canvas'));
  });

  // var game = Game.create(socket,
  //                        document.getElementById('canvas'),
  //                        document.getElementById('leaderboard'));

});
