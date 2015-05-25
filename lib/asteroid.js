(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var asteroid = Asteroids.asteroid = function (obj, game) {
    obj.radius = 50;
    obj.color = '#0000FF';
    obj.vel = Asteroids.Util.randomVec(4);
    Asteroids.movingObject.call(this, obj);
    this.game = game;
  };

  Asteroids.Util.inherits(asteroid, Asteroids.movingObject);

  asteroid.prototype.collideWith = function (otherObject) {
    if (this.isCollidedWith(otherObject) && otherObject instanceof Asteroids.ship) {
      otherObject.relocate();
    }
  };


})();
