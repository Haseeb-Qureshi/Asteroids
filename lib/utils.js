(function(){
  window.Asteroids = window.Asteroids || {};

  var Util = window.Asteroids.Util = { };

  Util.inherits = function (childClass, parentClass) {
    function Surrogate(){}
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
  };

  Util.randomVec = function (length){
    length *= 2;
    return [(Math.random() - 0.5) * length, (Math.random() - 0.5) * length];
  };

  Util.rotate = function (x, y, rads) {
    return [
      x * Math.cos(rads) - y * Math.sin(rads),
      y * Math.cos(rads) + x * Math.sin(rads)
    ];
  };

  Util.distance = function (pos1, pos2) {
    var rawDx = Math.abs(pos1[0] - pos2[0]);
    var rawDy = Math.abs(pos1[1] - pos2[1]);
    var xMax = Asteroids.Game.DIM_X;
    var yMax = Asteroids.Game.DIM_Y;

    var dx = (rawDx < (xMax / 2)) ? rawDx : xMax - rawDx;
    var dy = (rawDy < (yMax / 2)) ? rawDy : yMax - rawDy;
    return Math.sqrt((dx * dx) + (dy * dy));
  };

  Util.between = function (val, x1, x2) {
    return val >= x1 && val <= x2;
  };

  Util.isZeroVec = function (vec) {
    return vec[0] === 0 && vec[1] === 0;
  };

  if (!window.requestAnimationFrame) {
  window.requestAnimationFrame =
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame;
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame =
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.msCancelAnimationFrame;
  }
})();
