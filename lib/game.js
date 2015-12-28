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
    this.addAsteroids(this.NUM_ASTEROIDS, true);
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
    this.extraAsteroids = 0;
    this.difficulty = 0;
    this.items = [];
    setTimeout(this.addPowerUp.bind(this), 3000);
  };

  Game.prototype.addAsteroids = function (num, start) {
    for (var i = 0; i < num; i++) {
      var ast = new window.Asteroids.Asteroid({
        pos: start ? this.fairStartingPosition("asteroid") : this.fairEdge()
      }, this);
      this.asteroids.push(ast);
      ast.move(); // prevents immediate wrap-arounds
    }
    this.difficulty += 0.5;
  };

  Game.prototype.add = function (obj) {
    this.myCollection(obj).push(obj);
  };

  Game.prototype.remove = function (obj) {
    var collection = this.myCollection(obj);
    collection.splice(collection.indexOf(obj), 1);
  };

  Game.prototype.allCollidable = function() {
    return this.bullets.concat(this.ship);
  };

  Game.prototype.allObjects = function () {
    return this.particles
      .concat(this.items)
      .concat(this.asteroids)
      .concat(this.allCollidable());
  };

  Game.prototype.step = function() {
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
    var nonAsteroids = this.allCollidable();
    this.asteroids.forEach(function (ast) {
       for (var j = 0; j < nonAsteroids.length; j++) {
         if (ast.isCollidedWith(nonAsteroids[j]) ) {
           ast.collideWith(nonAsteroids[j]);
         }
       }
    });

    var ship = this.ship;
    this.items.forEach(function (item) {
      if (ship.isCollidedWith(item)) item.registerTouch(ship);
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
    var particle = Asteroids.Particle.generateParticle(pos, vel, this);
    this.add(particle);
    this.setParticleExpiration(particle);
  };

  Game.prototype.addExplosion = function (num, pos, radius, type) {
    for (var i = 0; i < num; i++) {
      var particle;
      if (type === "asteroid") {
        particle = Asteroids.Particle.asteroidExplosion(pos, radius, this);
      } else if (type === "ship") {
        particle = Asteroids.Particle.shipExplosion(pos, this);
      }
      this.add(particle);
      this.setParticleExpiration(particle);
    }
  };

  Game.prototype.reviveAnimation = function (pos) {
    var reviveParticle = Asteroids.Particle.reviveParticle(pos, this);
    this.add(reviveParticle);
    var that = this;
    this.setParticleExpiration(reviveParticle);
  };

  Game.prototype.setParticleExpiration = function (particle) {
    setTimeout(function () {
      this.particles.splice(this.particles.indexOf(particle));
    }.bind(this), 2000);
  };

  Game.prototype.addPowerUp = function () {
    var powerUp = new Asteroids.PowerUp(
      this.fairStartingPosition("powerUp"),
      "T",
      this
    );
    this.items.push(powerUp);
    this.add(new Asteroids.Particle.powerUpAppear(powerUp.pos, this));
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  };

  Game.prototype.registerPoints = function(points) {
    if (this.asteroids.length < 8) this.addAsteroids(this.difficulty);
    this.points += points;
  };

  Game.prototype.fairStartingPosition = function (type) {
    var pos = this.randomPosition();
    var fairnessFn;
    if (type === "ship") {
      fairnessFn = this.fairShipPosition.bind(this);
    } else if (type === "asteroid" || type === "powerUp") {
      fairnessFn = this.fairAsteroidPosition.bind(this);
    }

    while (!fairnessFn(pos)) pos = this.randomPosition();
    return pos;
  };

  Game.prototype.fairEdge = function () {
    var pos = this.randomEdge();
    while (!this.fairAsteroidPosition) pos = this.randomEdge();
    return pos;
  };

  Game.prototype.randomEdge = function () {
    var edge = Math.ceil(4 * Math.random());
    var pos;
    switch (edge) {
      case 1:
      pos = [0, Math.random() * this.DIM_Y];
      break;
      case 2:
      pos = [this.DIM_X, Math.random() * this.DIM_Y];
      break;
      case 3:
      pos = [Math.random() * this.DIM_X, 0];
      break;
      case 4:
      pos = [Math.random() * this.DIM_X, this.DIM_Y];
      break;
    }
    return pos;
  };

  Game.prototype.fairShipPosition = function (pos) {
    for (var i = 0; i < this.asteroids.length; i++) {
      var dist = Asteroids.Util.distance(pos, this.asteroids[i].pos);
      if (dist < 150) return false;
    }
    return true;
  };

  Game.prototype.fairAsteroidPosition = function (pos) {
    return Asteroids.Util.distance(pos, this.ship.pos) > 150;
  };

  Game.prototype.loseLife = function () {
    this.lives--;
  };

  Game.prototype.removePowerUp = function (powerUp) {
    var particle = new Asteroids.Particle.powerUpGet(powerUp.pos, this);
    this.add(particle);
    this.setParticleExpiration(particle);
    this.items.splice(this.items.indexOf(powerUp));
    setTimeout(this.addPowerUp.bind(this), 10000);
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
