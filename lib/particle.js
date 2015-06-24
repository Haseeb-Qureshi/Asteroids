(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Particle = Asteroids.Particle = function (settings) {
    Asteroids.MovingObject.call(this, settings);
    this.opacityDec = settings.opacityDec;
    this.radiusDec = settings.radiusDec;
    this.opacity = 0.6;
  };

  Asteroids.Particle.SPEED = 12;

  Asteroids.Util.inherits(Particle, Asteroids.MovingObject);

  Particle.prototype.isWrappable = false;

  Particle.prototype.move = function () {
    Asteroids.MovingObject.prototype.move.call(this);
    this.shrink();
  };

  Particle.prototype.shrink = function() {
    this.opacity > this.opacityDec ? (this.opacity -= this.opacityDec) : this.opacity = 0;
    this.radius > this.radiusDec ? (this.radius -= this.radiusDec) : this.radius = 0;
  };

  Particle.prototype.draw = function (ctx) {
    ctx.save();
    var randomGreen =  Math.floor(20 + 130 * Math.random());
    ctx.fillStyle = "rgba(255, " + randomGreen + ", 0, " + this.opacity + ")";
    ctx.shadowColor = "red";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 3;
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
    ctx.restore();
  };
})();
