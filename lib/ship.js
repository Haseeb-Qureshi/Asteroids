(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Ship = Asteroids.Ship = function (game) {
    var obj = {
      radius: 15,
      fill: '#00FF00',
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
    this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
  };

  Ship.prototype.fireBullet = function () {
    var shipVel = this.vel.slice();
    var shipPos = this.pos.slice();
    var bullet = new Asteroids.Bullet(shipPos, [0 , ((Math.abs(shipVel[1])) + 3) * -3], this.game);
    this.game.add(bullet);
  };


})();
