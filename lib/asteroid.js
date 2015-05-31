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
    this.rotationDegs = 0;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function (ctx) {
    var img = new Image();
    img.src = "./asteroid-texture.jpg";

    ctx.save();
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.translate(
      this.pos[0],
      this.pos[1]);
    ctx.rotate(this.rotationDegs++ * Math.PI/180);
    ctx.drawImage(img,
      -1/2 * img.naturalWidth,
      -1/2 * img.naturalHeight);

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
