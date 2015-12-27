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
})();
