(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Bullet = Asteroids.Bullet = function (pos, vel, game) {
    var obj = {};
    obj.radius = 2;
    obj.fill = '#FFF';
    obj.vel = vel;
    obj.pos = pos;
    obj.game = game;
    Asteroids.MovingObject.call(this, obj);
  };

  Asteroids.Bullet.SPEED = 15;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

})();
