(function(){
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function() {
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.NUM_ASTEROIDS = 5;
    this.asteroids = [];
    this.bullets = [];
    this.particles = [];
    this.ship = new window.Asteroids.Ship(this);
    this.addAsteroids();
    this.points = 0;
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      var pos = this.randomPosition();
      while (pos[0] > this.ship.pos[0] - 100 && pos[0] < this.ship.pos[0] + 100 &&
             pos[1] > this.ship.pos[1] - 100 && pos[1] < this.ship.pos[1] + 100) {
        pos = this.randomPosition(); // make the starting position fair
      }
      this.asteroids.push(new window.Asteroids.Asteroid( {
        pos: pos
      }, this));
    }
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof window.Asteroids.Bullet) {
      this.bullets.push(obj);
    } else if (obj instanceof window.Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else {
      this.particles.push(obj);
    }
  };

  Game.prototype.remove = function (obj) {
    var a = null;
    if (obj instanceof window.Asteroids.Bullet) {
      a = this.bullets;
    } else if (obj instanceof window.Asteroids.Asteroid) {
      a = this.asteroids;
    } else {
      a = this.particles;
    }
    a.splice(a.indexOf(obj), 1);
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  };

  Game.prototype.allVisibles = function () {
    return this.allObjects.concat(this.particles);
  }

  Game.prototype.step = function() {
    this.asteroids.length === 0 && this.addAsteroids(); // CHANGE THIS LATER TO BE MORE INTERESTING
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    var img = new Image();
    img.src = './assets/background.jpg';
    ctx.drawImage(img, 0, 0, 1000, 1000);

    this.allVisibles().forEach(function (obj) {
      obj.draw(ctx);
    });

    ctx.save();
    ctx.font = "36px Verdana";
    ctx.fillStyle = "yellow";
    ctx.shadowColor = "white";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;
    ctx.fillText("Points: " + this.points, 25, 40);
    ctx.restore();
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
    var nonAsteroids = that.allObjects(); // asteroids must be first, this algorithm skips over them
    this.asteroids.forEach(function (ast, i, arr) {
       for (var j = arr.length; j < nonAsteroids.length; j++) {
         if (ast.isCollidedWith(nonAsteroids[j]) ) {
           ast.collideWith(nonAsteroids[j]);
         }
       }
    });
  };

  Game.prototype.registerPoints = function(points) {
    this.points += points;
  };
})();
