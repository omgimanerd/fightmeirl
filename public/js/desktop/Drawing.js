/**
 * Methods for drawing all the sprites onto the HTML5 canvas.
 * @author kennethli.3470@gmail.com (Kenneth Li)
 * TODO: Add explosion drawing.
 */

/**
 * Creates a Drawing object.
 * @param {CanvasRenderingContext2D} context The context this object will
 *   draw to.
 * @param {Object<string, Image>} images The image objects used to draw
 *   each entity.
 * @constructor
 */
function Drawing(context, images) {
  this.context = context;
  /**
   * @type {Object<string, Image>}
   */
  this.images = images;
}

/**
 * @const
 * @type {string}
 */
Drawing.BASE_IMG_URL = '/public/img/';

/**
 * @const
 * @type {Object}
 */
Drawing.IMG_SRCS = {
  p: Drawing.BASE_IMG_URL + 'p.png',
  e: Drawing.BASE_IMG_URL + 'p.png'
};

/**
 * @const
 * @type {number}
 */
Drawing.TILE_SIZE = 100;

/**
 * Factory method for creating a Drawing object. It initializes all the
 * necessary Image objects.
 * @param {CanvasRenderingContext2D} context The context this object will
 *   draw to.
 * @return {Drawing}
 */
Drawing.create = function(context) {
  var images = {};
  for (var key in Drawing.IMG_SRCS) {
    images[key] = new Image();
    images[key].src = Drawing.IMG_SRCS[key];
  }
  return new Drawing(context, images);
};

/**
 * Clears the canvas.
 */
Drawing.prototype.clear = function() {
  this.context.clearRect(0, 0, Constants.CANVAS_WIDTH,
                         Constants.CANVAS_HEIGHT);
};

/**
 * This function draws the background tiles on the canvas.
 * @param {number} minX The minimum canvas x coordinate to start drawing from.
 * @param {number} minY The minimum canvas y coordinate to start drawing from.
 * @param {number} maxX The maximum canvas x coordinate to draw to.
 * @param {number} maxY The maximum canvas y coordinate to draw to.
 */
Drawing.prototype.drawTiles = function(minX, minY, maxX, maxY) {
  this.context.save();
  var tile = this.images['tile'];
  for (var x = minX; x < maxX; x += Drawing.TILE_SIZE) {
    for (var y = minY; y < maxY; y += Drawing.TILE_SIZE) {
      this.context.drawImage(tile, x, y);
    }
  }
  this.context.restore();
};

/*
 * This function draws the play to the canvas
 *
 */
Drawing.prototype.drawPlayer = function(isSelf, x, y, isPunching, isKicking){
  this.context.save();
  if(isSelf){
    if(isPunching){
      var image = this.images['pp'];
      this.context.translate(x, y);
      this.context.drawImage(image, image.width, image.height, -image.width/2, -image.height/2);
    } else if(isKicking){
      var image = this.images['pk'];
      this.context.translate(x, y);
      this.context.drawImage(image, image.width, image.height, -image.width/2, -image.height/2);
    } else{
      var image = this.images['p'];
      this.context.translate(x, y);
      this.context.drawImage(
        image, image.width, image.height, -image.width / 2, -image.height / 2);
    }
  }
  else{
    if(isPunching){
      var image = this.images['ep'];
      this.context.translate(x, y);
      this.context.drawImage(image, image.width, image.height, -image.width/2, -image.height/2);
    } else if(isKicking){
      var image = this.images['ek'];
      this.context.translate(x, y);
      this.context.drawImage(image, image.width, image.height, -image.width/2, -image.height/2);
    } else{
      var image = this.images['e'];
      this.context.translate(x, y);
      this.context.drawImage(
        image, image.width, image.height, -image.width / 2, -image.height / 2);
    }
  }
  this.context.restore();
  }
