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
  if (this.self) {
    // Clear the canvas.
    this.drawing.clear();

    /**
     * Draw the background first behind the other entities, we calculate the
     * closest top-left coordinate outside of the ViewPort. We use that
     * coordinate to draw background tiles from left to right, top to bottom,
     * so that the entire ViewPort is appropriately filled.
     */
    // var center = this.viewPort.selfCoords;
    // var leftX = this.self['x'] - Constants.CANVAS_WIDTH / 2;
    // var topY = this.self['y'] - Constants.CANVAS_HEIGHT / 2;
    // var drawStartX = Math.max(
    //     leftX - (leftX % Drawing.TILE_SIZE), Constants.WORLD_MIN);
    // var drawStartY = Math.max(
    //     topY - (topY % Drawing.TILE_SIZE), Constants.WORLD_MIN);
    // /**
    //  * drawEndX and drawEndY have an extra Drawing.TILE_SIZE added to account
    //  * for the edge case where we are at the bottom rightmost part of the
    //  * world.
    //  */
    // var drawEndX = Math.min(
    //     drawStartX + Constants.CANVAS_WIDTH + Drawing.TILE_SIZE,
    //     Constants.WORLD_MAX);
    // var drawEndY = Math.min(
    //     drawStartY + Constants.CANVAS_HEIGHT + Drawing.TILE_SIZE,
    //     Constants.WORLD_MAX);
    // this.drawing.drawTiles(
    //     this.viewPort.toCanvasX(drawStartX),
    //     this.viewPort.toCanvasY(drawStartY),
    //     this.viewPort.toCanvasX(drawEndX),
    //     this.viewPort.toCanvasY(drawEndY)
    // );
    //
    // // Draw the projectiles next.
    // for (var i = 0; i < this.projectiles.length; ++i) {
    //   this.drawing.drawBullet(
    //       this.viewPort.toCanvasCoords(this.projectiles[i]),
    //       this.projectiles[i]['orientation']);
    // }
  }
};
