(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Asteroid = Asteroids.Asteroid = function (obj, game) {
    obj.radius = 50;
    obj.fill = "#FFF";
    obj.game = game;
    obj.vel = Asteroids.Util.randomVec(4);
    Asteroids.MovingObject.call(this, obj);
    this.textureX = Math.random() * -50;
    this.textureY = Math.random() * -50;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function (ctx) {
    var backgroundImg = new Image();
    backgroundImg.src = "./asteroid-texture.jpg";

    ctx.save();
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(backgroundImg,
      this.pos[0] - this.radius + this.textureX,
      this.pos[1] - this.radius + this.textureY,
      300,
      300);

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.closePath();
    ctx.restore();
  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (this.isCollidedWith(otherObject)) {
      if (otherObject instanceof Asteroids.Ship) {
        otherObject.relocate();
      } else if (otherObject instanceof Asteroids.Bullet) {
        this.game.remove(otherObject);
        this.game.remove(this);
      }
    }
  };


})();
