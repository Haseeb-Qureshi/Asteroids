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
    this.setImage();
  };

  PowerUp.prototype.setImage = function () {
    this.image = new Image();
    var file;
    switch(this.type) {
      case "T":
        file = "triple.png";
        break;
      case "D":
        file = "thunder.png";
        break;
      case "L":
        file = "1up.png";
        break;
    }
    this.image.src = "./assets/" + file;
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
      case "D":
        this.game.destroyAsteroids();
        break;
      case "L":
        this.game.addLife();
        break;
    }
    this.game.removePowerUp(this);
  };
})();
