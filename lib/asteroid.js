(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Asteroid = Asteroids.Asteroid = function (obj, game) {
    obj.radius = 50;
    obj.color = '#0000FF';
    obj.vel = Asteroids.Util.randomVec(4);
    Asteroids.MovingObject.call(this, obj);
    this.game = game;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (this.isCollidedWith(otherObject) && otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };


})();
