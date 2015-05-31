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
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    var scaledImpulse = impulse.map(function (vel) { return vel / 2; });
    Math.abs(this.vel[0]) < 15 && (this.vel[0] += scaledImpulse[0]);
    Math.abs(this.vel[1]) < 15 && (this.vel[1] += scaledImpulse[1]);
  };

  Ship.prototype.fireBullet = function () {
    var shipVel = this.vel.slice();
    var shipPos = this.pos.slice();
    var bullet = new Asteroids.Bullet(shipPos, [0 , ((Math.abs(shipVel[1])) + 3) * -3], this.game);
    this.game.add(bullet);
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
