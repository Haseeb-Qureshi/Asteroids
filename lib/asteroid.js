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
    this.randomizeImage();
    this.rotationDegs = 0;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.randomizeImage = function () {
    var randomImage = Math.ceil(4 * Math.random());
    this.image = new Image();
    this.image.src = "./assets/ast" + randomImage + ".png";
  };

  Asteroid.prototype.randomizeOctagon = function () { // deprecated for performance
    this.textureX = Math.random() * -200;
    this.textureY = Math.random() * -200;
    this.darkness = Math.floor(Math.random() * 2.5);
    this.sides = Math.floor(Math.random() * 3) + 8;
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(
      this.pos[0],
      this.pos[1]
    );
    ctx.rotate(this.rotationDegs++ * Math.PI/180);
    ctx.drawImage(
      this.image,
      -(this.radius),
      -(this.radius),
      this.radius * 2,
      this.radius * 2
    );
    ctx.restore();
  };

  Asteroid.prototype.drawOctagonalAsteroids = function (ctx) { // deprecated for performance
    ctx.beginPath();

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
  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (this.isCollidedWith(otherObject)) {
      if (otherObject instanceof Asteroids.Ship) {
        if (otherObject.visible) otherObject.destroy();
      } else if (otherObject instanceof Asteroids.Bullet) {
        this.game.remove(otherObject);
        this.game.remove(this);
        this.game.playSound("explosion");
        this.game.addExplosion(3, this.pos, this.radius, "asteroid");
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
