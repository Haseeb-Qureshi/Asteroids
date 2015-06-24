(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Asteroid = Asteroids.Asteroid = function (settings, game, isSpawn) {
    this.isSpawn = isSpawn;
    settings.radius = isSpawn ? settings.radius : 50;
    settings.fill = "#FFF";
    settings.game = game;
    settings.vel = Asteroids.Util.randomVec((isSpawn ? 2 : 4));
    Asteroids.MovingObject.call(this, settings);
    this.textureX = Math.random() * -200;
    this.textureY = Math.random() * -200;
    this.darkness = Math.floor(Math.random() * 5);
    this.rotationDegs = 0;
    this.sides = Math.floor(Math.random() * 3) + 8;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(
      this.pos[0],
      this.pos[1]);

    ctx.rotate(this.rotationDegs++ * Math.PI/180);

    var a = ((Math.PI * 2)/this.sides);
    for (var i = 1; i <= this.sides; i++) {
      ctx.lineTo(this.radius * Math.cos(a * i), this.radius * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.clip();

    var img = new Image();
    img.src = "./assets/asteroid-texture.jpg";
    ctx.drawImage(
      img,
      -1/2 * (img.naturalWidth - this.textureX),
      -1/2 * (img.naturalHeight - this.textureX)
    );
    ctx.fillStyle = "rgba(0, 0, 0, 0." + this.darkness + ")";
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.restore();
  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (this.isCollidedWith(otherObject)) {
      if (otherObject instanceof Asteroids.Ship) {
        otherObject.relocate();
      } else if (otherObject instanceof Asteroids.Bullet) {
        this.game.remove(otherObject);
        this.game.remove(this);
        this.game.generateExplosion(this.pos, this.radius);
        if(!this.isSpawn) {
          this.createSpawns();
          this.game.registerPoints(Math.ceil(this.radius / 2));
        } else {
          this.game.registerPoints(Math.ceil(this.radius * 4));
        }
      }
    }
  };

  Asteroid.prototype.createSpawns = function() {
    for (var i = 0; i < 3; i++) {
      this.game.add(new window.Asteroids.Asteroid( {
        pos: this.nearbyPosition(),
        radius: 15 + Math.random() * 15
      }, this.game, true));
    }
  };

  Asteroid.prototype.nearbyPosition = function () {
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    return [this.pos[0] + dx, this.pos[1] + dy];
  };


})();
