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
    return Math.sqrt(
      Math.pow(Math.abs(pos1[0] - pos2[0]), 2) +
      Math.pow(Math.abs(pos1[1] - pos2[1]), 2)
    );
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
