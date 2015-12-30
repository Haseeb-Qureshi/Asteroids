(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Bullet = Asteroids.Bullet = function (pos, vel, game, tripleFire) {
    var settings = {};
    settings.radius = 2;
    settings.fill = '#FFF';
    settings.vel = vel;
    settings.pos = pos;
    settings.game = game;
    Asteroids.MovingObject.call(this, settings);
    this.shadowColor = tripleFire ? "#0EF" : "yellow";
  };

  Asteroids.Bullet.SPEED = 18;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.draw = function (ctx) {
    ctx.save();
    ctx.fillStyle = this.fill;
    ctx.shadowColor = this.shadowColor;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  Bullet.prototype.isWrappable = false;
})();
