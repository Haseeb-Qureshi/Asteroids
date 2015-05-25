(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var asteroid = Asteroids.asteroid = function (obj) {
    obj.radius = 20;
    obj.color = '#0000FF';
    obj.vel = Asteroids.Util.randomVec(4);
    Asteroids.movingObject.call(this, obj);
  };

  Asteroids.Util.inherits(asteroid, Asteroids.movingObject);

})();
