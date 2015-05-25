(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var ship = Asteroids.ship = function (game) {
    var obj = {
      radius: 15,
      color: '#00FF00',
      vel: [0, 0],
      pos: [400, 400]
    };
    Asteroids.movingObject.call(this, obj);
    this.game = game;
  };
  
  Asteroids.Util.inherits(ship, Asteroids.movingObject);

  ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };


})();
