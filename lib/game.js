(function(){
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function() {
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.NUM_ASTEROIDS = 5;
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.ship = new window.Asteroids.Ship(this);
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new window.Asteroids.Asteroid( {
        pos: this.randomPosition()
      }, this));
    }
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof window.Asteroids.Bullet) {
      this.bullets.push(obj);
    } else if (obj instanceof window.Asteroids.Asteroid) {
      this.asteroids.push(obj);
    }
  };

  Game.prototype.remove = function (obj) {
    if (obj instanceof window.Asteroids.Bullet) {
      var b = this.bullets;
      b.splice(b.indexOf(obj), 1);
    } else if (obj instanceof window.Asteroids.Asteroid) {
      var a = this.asteroids;
      a.splice(a.indexOf(obj), 1);
    }
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    var img = new Image();
    img.src = 'background.jpg';
    ctx.drawImage(img, 0, 0);

    this.allObjects().forEach(function (ast) {
      ast.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function (ast) {
      ast.move();
    });
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

  Game.prototype.isOutOfBounds = function (pos) {
    return pos[0] > 800 || pos[0] < 0 || pos[1] > 800 || pos[1] < 0;
  };

  Game.prototype.checkCollisions = function () {
    var that = this;
    var nonAsteroids = that.allObjects(); // asteroids must be first, this skips over them
    this.asteroids.forEach(function (ast, i, arr) {
       for (var j = arr.length; j < nonAsteroids.length; j++) {
         if (ast.isCollidedWith(nonAsteroids[j]) ) {
           ast.collideWith(nonAsteroids[j]);
         }
       }
    });
  };
})();
