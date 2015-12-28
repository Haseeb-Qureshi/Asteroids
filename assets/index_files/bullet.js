(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Bullet = Asteroids.Bullet = function (pos, vel, game) {
    var settings = {};
    settings.radius = 2;
    settings.fill = '#FFF';
    settings.vel = vel;
    settings.pos = pos;
    settings.game = game;
    Asteroids.MovingObject.call(this, settings);
  };

  Asteroids.Bullet.SPEED = 18;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

})();
