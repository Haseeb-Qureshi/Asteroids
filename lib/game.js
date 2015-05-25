(function(){
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function() {
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.NUM_ASTEROIDS = 5;
    this.asteroids = [];
    this.addAsteroids();
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new window.Asteroids.asteroid( {
        pos: this.randomPosition()
      }, this));
    }
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.asteroids.forEach(function (ast) { ast.draw(ctx); });
  };

  Game.prototype.moveObjects = function() {
    this.asteroids.forEach(function (ast) { ast.move(); });
  };

  Game.prototype.wrap = function (pos) {
    return pos.map(function (el) {
      if (el > 800) {
        return el - 800;
      } else if (el < 0) {
        return el + 800;
      }
      return el;
    });
  };

  Game.prototype.remove = function (asteroid) {
    var a = this.asteroids;
    a.splice(a.indexOf(asteroid), 1);
  };

  Game.prototype.checkCollisions = function () {
    var that = this;
    this.asteroids.forEach(function (ast, i) {
       for (var j = i + 1; j < that.NUM_ASTEROIDS; j++) {
         if (ast.isCollidedWith(that.asteroids[j]) ) {
           alert("OH GOD");
           ast.collideWith(that.asteroids[j]);
         }
       }
    });
  };
})();
