(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Particle = Asteroids.Particle = function (settings, game) {
    settings = settings || {};
    settings.radius = settings.radius || 5;
    settings.fill = 'rgba(255, 0, 0, ';
    settings.game = game;
    Asteroids.MovingObject.call(this, settings);
    this.opacity = 1;
  };

  Asteroids.Particle.SPEED = 12;

  Asteroids.Util.inherits(Particle, Asteroids.MovingObject);

  Particle.prototype.isWrappable = false;

  Particle.prototype.move = function () {
    MovingObject.prototype.move.call(this);
    this.shrink;
  };

  Particle.prototype.shrink = function() {
    this.opacity > 0 ? (this.opacity -= .003) : this.opacity = 0;
  };

  Particle.prototype.draw = function (ctx) {
    ctx.save();
    ctx.fillStyle = this.fill + this.opacity + ")";
    ctx.shadowColor = "red";
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
})();
