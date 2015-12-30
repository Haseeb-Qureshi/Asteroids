(function(){
  window.Asteroids = window.Asteroids || {};

  var Splash = window.Asteroids.Splash = function (ctx) {
    this.ctx = ctx;
    this.foreground = new Image();
    this.foreground.src = "./assets/splash-transparent.png";
    this.starCount = 0;
    this.stepCount = 0;
    this.stars = [];
  };

  Splash.MAX_STARS = 20;

  Splash.COLORS = [
    "red",
    "orchid",
    "magenta",
    "white",
    "greenyellow",
    "aqua",
    "gold"
  ];

  Splash.prototype.loop = function (ctx) {
    this.frameId = requestAnimationFrame(Splash.prototype.loop.bind(this));
    this.step();
    this.draw();
  };

  Splash.prototype.step = function () {
    this.stepCount++;
    if (this.starCount < Splash.MAX_STARS && this.stepCount % 12 === 0) {
      this.addNewStar();
    }
  };

  Splash.prototype.addNewStar = function () {
    var randX = Math.ceil(Asteroids.Game.DIM_X * Math.random());
    var randY = Math.ceil(Asteroids.Game.DIM_Y * Math.random());
    var randColor = Splash.COLORS[Math.floor(Math.random() * Splash.COLORS.length)];
    var newStar = new Asteroids.Star(randX, randY, randColor, this.stepCount);
    this.stars.push(newStar);
  };

  Splash.prototype.draw = function () {
    var ctx = this.ctx;
    ctx.save();
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(this.foreground, 0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.restore();
  };
})();
