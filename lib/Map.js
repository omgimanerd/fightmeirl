/**
 * @fileoverview Stores the Map
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

var Entity = require('./Entity');

var Util = require('../shared/Util');

function Map() {
  throw new Error('Map should not be instantiated!');
}

Map.createPlatform = function(x, y, width, height) {
  return new Entity(x, y, 0, 0, 0, 0, width, height);
};

Map.generate = function() {
  platforms = [
    [1250, 2500, 2500, 10]
  ];
  for (var y = 2380; y > 100; y -= 120) {
    var x = Util.randRangeInt(0, 150);
    var width = Util.randRangeInt(50, 200);
    var interval = Util.randRangeInt(250, 500);
    while (x + width < 2500) {
      platforms.push([x, y, width, 10]);
      x += width + interval;
      width = Util.randRangeInt(50, 200);
      interval = Util.randRangeInt(100, 500);
    }
  }
  return platforms.map(function(current) {
    return Map.createPlatform.apply(null, current);
  });
};

module.exports = Map;
