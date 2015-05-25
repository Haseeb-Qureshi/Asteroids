(function(){
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function() {
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.NUM_ASTEROIDS = 15;
    this.asteroids = [];
    this.addAsteroids();
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new window.Asteroids.asteroid( {
        pos: this.randomPosition()
      }));
    }
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.asteroids.forEach(function (ast) { ast.draw(ctx); });
  };

  Game.prototype.moveObjects = function() {
    this.asteroids.forEach(function (ast) { ast.move(); });
  };
})();
