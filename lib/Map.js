/**
 * @fileoverview Stores the Map
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var Entity = require('./Entity');

function Map() {
  throw new Error('Map should not be instantiated!');
}

Map.generatePlatform = function(x, y, width, height) {
  return new Entity(x, y, 0, 0, 0, 0, width, height);
};

Map.getPlatforms = function() {
  return [
    [100, 2400, 50, 10],
    [600, 2400, 50, 10],
    [1250, 2500, 2500, 10]
  ].map(function(current) {
    return Map.generatePlatform.apply(null, current);
  });
};

module.exports = Map;
