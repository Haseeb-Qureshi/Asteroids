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
      this.asteroids.push(new window.Asteroids.Asteroid( {
        pos: this.fairStartingPosition()
      }, this));
    }
  };

  Game.prototype.add = function (obj) {
    this.myCollection(obj).push(obj);
  };

  Game.prototype.remove = function (obj) {
    var collection = this.myCollection(obj);
    collection.splice(collection.indexOf(obj), 1);
  };

  Game.prototype.allInteractives = function() {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  };

  Game.prototype.allObjects = function () {
    return this.particles.concat(this.allInteractives());
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

    this.allObjects().forEach(function (obj) {
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
    this.allObjects().forEach(function (obj) {
      obj.move();
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
    var nonAsteroids = that.allInteractives(); // asteroids must be first, this algorithm skips over them
    this.asteroids.forEach(function (ast, i, arr) {
       for (var j = arr.length; j < nonAsteroids.length; j++) {
         if (ast.isCollidedWith(nonAsteroids[j]) ) {
           ast.collideWith(nonAsteroids[j]);
         }
       }
    });
  };

  Game.prototype.generateParticle = function (pos, vel) {
    var particle = new Asteroids.Particle({
      radius: 7,
      game: this,
      pos: pos,
      vel: vel,
      opacityDec: 0.025,
      radiusDec: 0.05
    }, "particle");
    this.add(particle);
  };

  Game.prototype.generateExplosion = function (pos, radius) {
    for (var i = 0; i < 3; i++) {
      var vel = Asteroids.Util.randomVec(1);
      var explosion = new Asteroids.Particle({
        radius: Math.sqrt(radius) * 3,
        game: this,
        pos: pos.slice(),
        vel: vel,
        opacityDec: 0.025,
        radiusDec: 0.05
      }, "explosion");
      this.add(explosion);
    }
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };

  Game.prototype.registerPoints = function(points) {
    this.points += points;
  };

  Game.prototype.fairStartingPosition = function () {
    var pos = this.randomPosition();
    while (pos[0] > this.ship.pos[0] - 100 && pos[0] < this.ship.pos[0] + 100 &&
           pos[1] > this.ship.pos[1] - 100 && pos[1] < this.ship.pos[1] + 100)
    {
      pos = this.randomPosition()
    }
    return pos;
  };

  Game.prototype.myCollection = function (obj) {
    var a;
    if (obj instanceof window.Asteroids.Bullet) {
      a = this.bullets;
    } else if (obj instanceof window.Asteroids.Asteroid) {
      a = this.asteroids;
    } else {
      a = this.particles;
    }
    return a;
  };
})();
