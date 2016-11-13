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

  /**
   * @type {Array<Object>}
   */
  this.players = [];

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

    //draw self
    player['x'] = this.viewPort.toCanvasX(player['x']);
    player['y'] = this.viewPort.toCanvasY(player['y']);
    this.drawing.drawPlayer(
      false,
      player['x'],
      player['y'],
      player['isPunching'],
      player['isKicking']
    );

    // Iterate through players, draw each using info from json obj.
    for (var i = 0; i < this.players.length; ++i) {
      var player = this.players[i];
      player['x'] = this.viewPort.toCanvasX(player['x']);
      player['y'] = this.viewPort.toCanvasY(player['y']);
      this.drawing.drawPlayer(
        false,
        player['x'],
        player['y'],
        player['isPunching'],
        player['isKicking']
      );
    }
  }
};
