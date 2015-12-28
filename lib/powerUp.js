(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var PowerUp = Asteroids.PowerUp = function (pos, type, game) {
    this.pos = pos;
    this.type = type;
    this.game = game;
    this.radius = 25;
    this.duration = 10;
    this.waitLag = 10;
    this.image = new Image();
    this.image.src = "./assets/powerup.png";
  };

  PowerUp.prototype.draw = function (ctx) {
    ctx.drawImage(
      this.image,
      this.pos[0] - this.radius,
      this.pos[1] - this.radius,
      this.radius * 2,
      this.radius * 2);
  };

  PowerUp.prototype.move = function (){};

  PowerUp.prototype.registerTouch = function (ship) {
    switch (this.type) {
      case "T":
        ship.enableTripleFire();
        this.game.removePowerUp(this);
        break;
    }
  };
})();
