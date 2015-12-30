(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Particle = Asteroids.Particle = function (settings, kind) {
    Asteroids.MovingObject.call(this, settings);
    this.opacityDec = settings.opacityDec;
    this.radiusDec = settings.radiusDec;
    this.moving = !Asteroids.Util.isZeroVec(this.vel);
    this.opacity = 0.6;
    this.kind = kind;
    this.setFillStyle();
  };

  Particle.generateParticle = function (pos, vel, game) {
    return new Asteroids.Particle({
      radius: 7,
      game: game,
      pos: pos.slice(),
      vel: vel,
      opacityDec: 0.025,
      radiusDec: 0.05
    }, "particle");
  };

  Particle.asteroidExplosion = function (pos, radius, game) {
    var vel = Asteroids.Util.randomVec(1);
    return new Asteroids.Particle({
      radius: Math.sqrt(radius) * 3,
      game: game,
      pos: pos.slice(),
      vel: vel,
      opacityDec: 0.025,
      radiusDec: 0.05
    }, "explosion");
  };

  Particle.shipExplosion = function (pos, game) {
    var vel = Asteroids.Util.randomVec(8);
    return new Asteroids.Particle({
      radius: 30,
      game: game,
      pos: pos.slice(),
      vel: vel,
      opacityDec: 0.025,
      radiusDec: 0.05
    }, "ship");
  };

  Particle.reviveParticle = function (pos, game) {
    return new Asteroids.Particle({
      radius: 20,
      game: game,
      pos: pos.slice(),
      vel: [0, 0],
      opacityDec: 0.018,
      radiusDec: -1
    }, "revive");
  };

  Particle.powerUpAppear = function (pos, game) {
    return new Asteroids.Particle({
      radius: 30,
      game: game,
      pos: pos.slice(),
      vel: [0, 0],
      opacityDec: 0.010,
      radiusDec: -0.15
    }, "powerUpAppear");
  };

  Particle.powerUpGet = function (pos, game) {
    return new Asteroids.Particle({
      radius: 20,
      game: game,
      pos: pos.slice(),
      vel: [0, 0],
      opacityDec: 0.045,
      radiusDec: -2
    }, "powerUpGet");
  };

  Particle.SPEED = 12;

  Asteroids.Util.inherits(Particle, Asteroids.MovingObject);

  Particle.prototype.setFillStyle = function () {
    var fillStyle, shadowColor, shadowBlur;
    switch (this.kind) {
      case "explosion":
        fillStyle = "rgba(192, 192, 192, 1)";
        shadowColor = "white";
        shadowBlur = this.radius;
        break;
      case "ship":
        var aLottaGreen = Math.floor(100 + 130 * Math.random());
        fillStyle = "rgba(255, " + aLottaGreen + ", 0, 1)";
        shadowColor = "white";
        shadowBlur = this.radius;
        break;
      case "particle":
        var aLittleGreen =  Math.floor(20 + 130 * Math.random());
        fillStyle = "rgba(255, " + aLittleGreen + ", 0, 1)";
        shadowColor = "red";
        shadowBlur = 3;
        break;
      case "revive":
        fillStyle = "rgba(50, 50, 255, 1)";
        shadowColor = "white";
        shadowBlur = 6;
        break;
      case "powerUpAppear":
        fillStyle = "rgba(100, 100, 255, 1)";
        shadowColor = "white";
        shadowBlur = 6;
        break;
      case "powerUpGet":
        fillStyle = "rgba(255, 70, 70, 1)";
        shadowColor = "white";
        shadowBlur = 6;
        break;
    }
    this.fillStyle = fillStyle;
    this.shadowColor = shadowColor;
    this.shadowBlur = shadowBlur;
  };

  Particle.prototype.isWrappable = false;

  Particle.prototype.shrink = function() {
    this.opacity -= this.opacity > this.opacityDec ? this.opacityDec : this.opacity;
    this.radius -= this.radius > this.radiusDec ? this.radiusDec : this.radius;
  };

  Particle.prototype.draw = function (ctx) {
    this.shrink();
    ctx.save();
    ctx.fillStyle = this.fillStyle.slice(0, -3) + this.opacity + ")";
    ctx.shadowColor = this.shadowColor;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = this.shadowBlur;
    this.drawArc(ctx);
    ctx.fill();
    ctx.restore();
  };

  Particle.prototype.drawArc = function (ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );
  };
})();
