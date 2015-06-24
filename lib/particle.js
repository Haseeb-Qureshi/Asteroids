(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Particle = Asteroids.Particle = function (settings, kind) {
    Asteroids.MovingObject.call(this, settings);
    this.opacityDec = settings.opacityDec;
    this.radiusDec = settings.radiusDec;
    this.opacity = 0.6;
    this.kind = kind;
    this.setFillStyle();
  };

  Asteroids.Particle.SPEED = 12;

  Asteroids.Util.inherits(Particle, Asteroids.MovingObject);

  Particle.prototype.setFillStyle = function () {
    if(this.kind === "explosion") {
      this.fillStyle = "rgba(192, 192, 192, 1)";
      this.shadowColor = "white";
      this.shadowBlur = this.radius;
    } else {
      var randomGreen =  Math.floor(20 + 130 * Math.random());
      this.fillStyle = "rgba(255, " + randomGreen + ", 0, 1)";
      this.shadowColor = "red";
      this.shadowBlur = 3;
    }
  };

  Particle.prototype.isWrappable = false;

  Particle.prototype.shrink = function() {
    this.opacity > this.opacityDec ? (this.opacity -= this.opacityDec) : this.opacity = 0;
    this.radius > this.radiusDec ? (this.radius -= this.radiusDec) : this.radius = 0;
  };

  Particle.prototype.draw = function (ctx) {
    this.shrink();
    ctx.save();
    ctx.fillStyle = this.fillStyle.slice(0, -3) + this.opacity + ")";
    ctx.shadowColor = this.shadowColor;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = this.shadowBlur;
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
