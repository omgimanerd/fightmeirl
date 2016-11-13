/**
 * Methods for drawing all the sprites onto the HTML5 canvas.
 * @author kennethli.3470@gmail.com (Kenneth Li)
 */

/**
 * Creates a Drawing object.
 * @param {CanvasRenderingContext2D} context The context this object will
 *   draw to.
 * @param {Object<string, Image>} images The image objects used to draw
 *   each entity.
 * @constructor
 */
function Drawing(context, images, animationFrames) {
  this.context = context;

  this.images = images;

  this.animationFrames = animationFrames;
}

/**
 * Factory method for creating a Drawing object. It initializes all the
 * necessary Image objects.
 * @param {CanvasRenderingContext2D} context The context this object will
 *   draw to.
 * @return {Drawing}
 */
Drawing.create = function(context) {
  animationFrames = Animation.create();
  return new Drawing(context, null, animationFrames);
};

/**
 * Clears the canvas.
 */
Drawing.prototype.clear = function() {
  this.context.clearRect(0, 0, Constants.CANVAS_WIDTH,
                         Constants.CANVAS_HEIGHT);
};

Drawing.prototype.drawPlayer = function(isSelf, x, y, vx, facing,
                                        width, height,
                                        isPunching, isKicking) {
  this.context.save();
  this.context.translate(x, y);
  var image = this.animationFrames.getSprite(
    isSelf, facing, vx, isPunching, isKicking, 0.99);
    this.context.drawImage(image, -width / 2, -height / 2, width, height);
  this.context.restore();
};
