(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var PowerUp = Asteroids.PowerUp = function (pos, kind) {
    this.pos = pos;
    this.kind = kind;
    this.duration = 10;
    this.waitLag = 10;
    this.image = new Image();
    this.image.src = "./assets/powerup.png";
  };

  PowerUp.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, this.pos[0], this.pos[1], 50, 50);
  };

  PowerUp.prototype.move = function (){};
})();
