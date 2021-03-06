/**
 * Class encapsulating the client side of the game, handles drawing and
 * updates.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

function Game(socket, drawing, viewPort) {
  this.socket = socket;

  this.drawing = drawing;
  this.viewPort = viewPort;

  this.self = null;

  this.players = [];
  this.platforms = [];

  this.animationFrameCount = 0;
  this.animationFrameId = 0;
}

/**
 * Factory method for the Game class.
 * @param {Object} socket The socket connected to the server.
 * @param {Element} canvasElement The HTML5 canvas to render the game on.
 * @param {Element} leaderboardElement The div element to render the
 *   leaderboard in.
 * @return {Game}
 */
Game.create = function(socket, canvasElement) {
  canvasElement.width = Constants.CANVAS_WIDTH;
  canvasElement.height = Constants.CANVAS_HEIGHT;
  var canvasContext = canvasElement.getContext('2d');

  var drawing = Drawing.create(canvasContext);
  var viewPort = ViewPort.create();

  var game = new Game(socket, drawing, viewPort);
  game.init();
  return game;
};

/**
 * Initializes the game and sets the event handler for the server packets.
 */
Game.prototype.init = function() {
  this.socket.on('update', bind(this, function(data) {
    this.receiveGameState(data);
  }));
};

/**
 * Updates the game's internal storage of all the powerups, called each time
 * the server sends packets.
 * @param {Object} state An object containing the state of the game sent by
 *   the server.
 */
Game.prototype.receiveGameState = function(state) {
  this.self = state['self'];
  this.players = state['players'];
  this.platforms = state['platforms'];
};

/**
 * This method begins the animation loop for the game.
 */
Game.prototype.animate = function() {
  this.animationFrameId = window.requestAnimationFrame(
      bind(this, this.run));
};

/**
 * This method stops the animation loop for the game.
 */
Game.prototype.stopAnimation = function() {
  window.cancelAnimationFrame(this.animationFrameId);
};

/**
 * This method is a convenience method that calls update and draw.
 */
Game.prototype.run = function() {
  this.draw();
  this.animate();
  this.animationFrameCount++;
};


/**
 * Draws the state of the game onto the HTML5 canvas.
 */
Game.prototype.draw = function() {
  var player = this.self;
  if (player) {
    this.viewPort.update(player['x'], player['y']);
    // Clear the canvas.
    this.drawing.clear();

    for (var platform of this.platforms) {
      platform['x'] = this.viewPort.toCanvasX(platform['x']);
      platform['y'] = this.viewPort.toCanvasY(platform['y']);
      this.drawing.drawPlatform(
        platform['x'], platform['y'],
        platform['width'], platform['height']);
    }

    //draw self
    player['x'] = this.viewPort.toCanvasX(player['x']);
    player['y'] = this.viewPort.toCanvasY(player['y']);
    this.drawing.drawPlayer(
      true, player['x'], player['y'], player['vx'], player['facing'],
      player['width'], player['height'], player['health'],
      player['isPunching'], player['isKicking']
    );
    $('.scream-volume').width((player['screamPower'] - 1) * 200);
    if (player['screamPower'] > 4) {
      $('.scream-volume').text('IT\'S OVER 9000');
    } else {
      $('.scream-volume').text(Math.round((player['screamPower'] - 1) * 3000));
    }

    // Iterate through players, draw each using info from json obj.
    for (var i = 0; i < this.players.length; ++i) {
      var player = this.players[i];
      player['x'] = this.viewPort.toCanvasX(player['x']);
      player['y'] = this.viewPort.toCanvasY(player['y']);
      this.drawing.drawPlayer(
        false, player['x'], player['y'], player['vx'], player['facing'],
        player['width'], player['height'], player['health'],
        player['isPunching'], player['isKicking']
      );
    }
  }
};
