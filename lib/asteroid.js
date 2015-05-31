(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Asteroid = Asteroids.Asteroid = function (obj, game, spawn) {
    obj.radius = spawn ? obj.radius : 50;
    obj.fill = "#FFF";
    obj.game = game;
    obj.vel = spawn ? Asteroids.Util.randomVec(2) : Asteroids.Util.randomVec(4);
    Asteroids.MovingObject.call(this, obj);
    this.textureX = Math.random() * -200;
    this.textureY = Math.random() * -200;
    this.darkness = Math.floor(Math.random() * 6);
    this.rotationDegs = 0;
    this.sides = Math.ceil(Math.random() * 6) + 6;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function (ctx) {
    var img = new Image();
    img.src = "./assets/asteroid-texture.jpg";

    ctx.save();
    ctx.beginPath();
    // ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
    ctx.translate(
      this.pos[0],
      this.pos[1]);
    var a = ((Math.PI * 2)/this.sides);

    ctx.rotate(this.rotationDegs++ * Math.PI/180);
    for (var i = 1; i <= this.sides; i++) {
      ctx.lineTo(this.radius * Math.cos(a * i), this.radius * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(img,
      -1/2 * (img.naturalWidth - this.textureX),
      -1/2 * (img.naturalHeight - this.textureX));
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
        if(this.radius === 50) {
          for (var i = 0; i < 3; i++) {
            this.game.asteroids.push(new window.Asteroids.Asteroid( {
              pos: this.nearbyPosition(),
              radius: 20
            }, this.game, true));
          }
        }
      }
    }
  };

  Asteroid.prototype.nearbyPosition = function () {
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    return [this.pos[0] + dx, this.pos[1] + dy];
  };


})();
