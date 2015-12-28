(function(){
  window.Asteroids = window.Asteroids || {};

  var Game = window.Asteroids.Game = function () {
    this.DIM_X = 800;
    this.DIM_Y = 600;
    this.NUM_ASTEROIDS = 5;
    this.asteroids = [];
    this.bullets = [];
    this.particles = [];
    this.ship = new window.Asteroids.Ship(this);
    this.addAsteroids();
    this.points = 0;
    this.backgroundShift = 0;
    this.moveLeft = false;
    this.backgroundImage = new Image();
    this.backgroundImage.src = "./assets/stars.jpg";
    this.shipImage = new Image();
    this.shipImage.src = "./assets/ship.png";
    this.sounds = new window.Asteroids.Sounds(this);
    this.sounds.buildSoundPool();
    this.lives = 3;
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new window.Asteroids.Asteroid( {
        pos: this.fairRandomPosition("asteroid")
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
  };

  Game.prototype.step = function() {
    if (this.asteroids.length === 0) this.addAsteroids(); // CHANGE THIS LATER TO BE MORE INTERESTING
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.drawBackground(ctx);

    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });

    this.drawText(ctx);
    this.drawLives(ctx);
  };

  Game.prototype.drawBackground = function (ctx) {
    this.shiftBackground();
    ctx.drawImage(this.backgroundImage, this.backgroundShift, 0, 1000, 1000);
  };

  Game.prototype.drawText = function (ctx) {
    ctx.save();
    ctx.font = "36px VT323";
    ctx.fillStyle = "yellow";
    ctx.shadowColor = "#f90";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 3;
    ctx.fillText("Points: " + this.points, 25, 40);
    ctx.fillText("x " + this.lives, this.DIM_X - 60, 36);
    ctx.restore();
  };

  Game.prototype.drawLives = function (ctx) {
    ctx.drawImage(this.shipImage, this.DIM_X - 100, 10, 30, 30);
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function (obj) {
      obj.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    return pos.map(function (el, i) {
      var dim = i === 0 ? this.DIM_X : this.DIM_Y;
      if (el > dim) {
        return el - dim;
      } else if (el < 0) {
        return el + dim;
      }
      return el;
    }.bind(this));
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return pos[0] > this.DIM_X || pos[0] < 0 || pos[1] > this.DIM_Y || pos[1] < 0;
  };

  Game.prototype.checkCollisions = function () {
    var nonAsteroids = this.allInteractives(); // asteroids must be first, this algorithm skips over them
    this.asteroids.forEach(function (ast, i, arr) {
       for (var j = arr.length; j < nonAsteroids.length; j++) {
         if (ast.isCollidedWith(nonAsteroids[j]) ) {
           ast.collideWith(nonAsteroids[j]);
         }
       }
    });
  };

  Game.prototype.shiftBackground = function () {
    if (this.backgroundShift <= -200) this.moveLeft = true;
    if (this.backgroundShift >= 0) this.moveLeft = false;

    if (this.moveLeft) {
      this.backgroundShift += 0.3;
    } else {
      this.backgroundShift -= 0.15;
    }
  };

  Game.prototype.generateParticle = function (pos, vel) {
    this.add(Asteroids.Particle.generateParticle(pos, vel, this));
  };

  Game.prototype.addExplosion = function (num, pos, radius, type) {
    for (var i = 0; i < num; i++) {
      if (type === "asteroid") {
        this.add(Asteroids.Particle.asteroidExplosion(pos, radius, this));
      } else if (type === "ship") {
        this.add(Asteroids.Particle.shipExplosion(pos, this));
      }
    }
  };

  Game.prototype.reviveAnimation = function (pos) {
    var reviveParticle = Asteroids.Particle.reviveParticle(pos, this);
    this.add(reviveParticle);
    var that = this;
    setTimeout(function () {
      that.particles.splice(that.particles.indexOf(reviveParticle));
    }, 2000);
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };

  Game.prototype.registerPoints = function(points) {
    this.points += points;
  };

  Game.prototype.fairRandomPosition = function (type) {
    var pos = this.randomPosition();
    var fairnessFn;
    if (type === "ship") {
      fairnessFn = this.fairShipPosition.bind(this);
    } else if (type === "asteroid") {
      fairnessFn = this.fairAsteroidPosition.bind(this);
    }

    while (!fairnessFn(pos)) pos = this.randomPosition();
    return pos;
  };

  Game.prototype.fairShipPosition = function (pos) {
    for (var i = 0; i < this.asteroids.length; i++) {
      var dist = Game.distance(pos, this.asteroids[i].pos);
      if (dist < 150) return false;
    }
    return true;
  };

  Game.prototype.fairAsteroidPosition = function (pos) {
    return Game.distance(pos, this.ship.pos) > 150;
  };

  Game.prototype.loseLife = function () {
    this.lives--;
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

  Game.distance = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(Math.abs(pos1[0] - pos2[0]), 2) +
      Math.pow(Math.abs(pos1[1] - pos2[1]), 2)
    );
  };
})();
