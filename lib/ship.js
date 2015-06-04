(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Ship = Asteroids.Ship = function (game) {
    var settings = {
      radius: 15,
      fill: '#F00',
      vel: [0, 0],
      pos: [400, 400],
      game: game
    };
    Asteroids.MovingObject.call(this, settings);
    this.MAX_SPEED = 15;
    this.points = 0;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.getAngle = function () {
    var angle = Math.atan2(this.vel[1], this.vel[0]) + Math.PI;
    if (this.zeroVel()) {
      return this.lastAngle || Math.PI / 2;
    } else {
      this.lastAngle = angle;
      return this.lastAngle;
    }
  };

  Ship.prototype.powerVel = function () {
    if (this.unitVel < this.MAX_SPEED && this.unitVel + 1 < this.MAX_SPEED) {

    }
  };

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    var scaled = impulse.map(function (vel) { return vel / 2; });
    if (Math.abs(this.vel[0]) <= this.MAX_SPEED &&
        Math.abs(this.vel[0] + scaled[0]) <= this.MAX_SPEED) {
      this.vel[0] += scaled[0];
    }
    if (Math.abs(this.vel[1]) <= this.MAX_SPEED &&
        Math.abs(this.vel[1] + scaled[1]) <= this.MAX_SPEED) {
      this.vel[1] += scaled[1];
    }
  };

  Ship.prototype.fireBullet = function () {
    var shipVel = this.vel.slice();
    var shipPos = this.pos.slice();
    var bullet = new Asteroids.Bullet(
      shipPos,
      this.bulletVelocity(),
      this.game);
    this.game.add(bullet);
  };

  Ship.prototype.bulletVelocity = function() {
    if (this.zeroVel()) {
      return [Math.cos(this.getAngle()) * Asteroids.Bullet.SPEED * -1,
              Math.sin(this.getAngle()) * Asteroids.Bullet.SPEED * -1];
    }

    var velocity = Math.sqrt(this.vel.reduce(function (sum, vec) {
      return sum + vec * vec;
    }, 0));

    return this.vel.map(function (vec) {
      return vec / velocity * Asteroids.Bullet.SPEED;
    });
  };

  Ship.prototype.draw = function (ctx) {
    var a = ((Math.PI * 2)/3);
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.getAngle() + Math.PI);
    ctx.moveTo(this.radius, 0);
    var vertex = [];
    for (var i = 1; i <= 3; i++) {
      vertex.push([this.radius * Math.cos(a * i), this.radius * Math.sin(a * i)]);
      ctx.lineTo(vertex[i - 1][0], vertex[i - 1][1]);
    }
    var grd = ctx.createLinearGradient(0, 0, vertex[2][0], vertex[2][1]);
    grd.addColorStop(0, "#511");
    grd.addColorStop(1, "#F00");
    if (!this.zeroVel) {
      ctx.shadowColor = "yellow";
      var os = this.radius * 2
      ctx.shadowOffsetX = this.pos[0] - (this.vel[0] > 0 ? this.vel[0] + os : this.vel[0] - os);
      ctx.shadowOffsetY = this.pos[1] - (this.vel[1] > 0 ? this.vel[1] + os : this.vel[1] - os);
      ctx.shadowBlur = 10;
    }
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };

  Ship.prototype.zeroVel = function () {
    return this.vel[0] === 0 && this.vel[1] === 0;
  };


})();
