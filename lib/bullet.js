(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Bullet = Asteroids.Bullet = function (pos, vel, game) {
    var obj = {};
    obj.radius = 2;
    obj.color = '#F00';
    obj.vel = vel;
    obj.pos = pos;
    obj.game = game;
    Asteroids.MovingObject.call(this, obj);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

})();
