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

  Particle.SPEED = 12;

  Asteroids.Util.inherits(Particle, Asteroids.MovingObject);

  Particle.prototype.setFillStyle = function () {
    switch (this.kind) {
      case "explosion":
        this.fillStyle = "rgba(192, 192, 192, 1)";
        this.shadowColor = "white";
        this.shadowBlur = this.radius;
        break;
      case "ship":
        var aLottaGreen = Math.floor(100 + 130 * Math.random());
        this.fillStyle = "rgba(255, " + aLottaGreen + ", 0, 1)";
        this.shadowColor = "white";
        this.shadowBlur = this.radius;
        break;
      case "particle":
        var aLittleGreen =  Math.floor(20 + 130 * Math.random());
        this.fillStyle = "rgba(255, " + aLittleGreen + ", 0, 1)";
        this.shadowColor = "red";
        this.shadowBlur = 3;
        break;
      case "revive":
        this.fillStyle = "rgba(50, 50, 255, 1)";
        this.shadowColor = "white";
        this.shadowBlur = 6;
        break;
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
