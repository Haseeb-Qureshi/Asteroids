(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Ship = Asteroids.Ship = function (game) {
    var obj = {
      radius: 15,
      fill: '#F00',
      vel: [0, 0],
      pos: [400, 400],
      game: game
    };
    Asteroids.MovingObject.call(this, obj);
    this.MAX_SPEED = 15;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

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
    if (this.vel[0] === 0 && this.vel[1] === 0) {
      return [0, -1 * Asteroids.Bullet.SPEED];
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
    ctx.moveTo(this.radius, 0);
    for (var i = 1; i < 3; i++) {
      ctx.lineTo(this.radius * Math.cos(a * i), this.radius * Math.sin(a * i));
    }
    ctx.fillStyle = this.fill;
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  };


})();
