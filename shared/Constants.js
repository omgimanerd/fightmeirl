/**
 * This class stores global constants between the client and server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

/**
 * Empty constructor for the Constants class.
 * @constructor
 */
function Constants() {
  throw new Error('Constants should not be instantiated!');
}

if (typeof module === 'object') {
  /**
   * If Constants is loaded as a Node module, then this line is called.
   */
  module.exports = Constants;
} else {
  /**
   * If Constants is loaded into the browser, then this line is called.
   */
  window.Constants = Constants;
}
