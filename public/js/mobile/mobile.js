/**
 * Client side script that initializes the game. This should be the only script
 * that depends on JQuery.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

$(document).ready(function() {
  var socket = io();

  socket.emit('new-mobile');


  // Input.applyEventHandlers(document.getElementById('canvas'));
  // Input.addMouseTracker(document.getElementById('canvas'));

  setInterval(function() {
  }, 1000);
});
