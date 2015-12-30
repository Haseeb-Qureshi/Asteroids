(function(){
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function (canvas, ctx) {
    this.canvas = canvas;
    this.game = new Asteroids.Game();
    this.ctx = ctx;
    this.gameOver = false;
    this.keyListener = new Asteroids.KeyListener(this.game);
    this.sound = new Asteroids.Sounds(this.game);
  };

  GameView.prototype.start = function () {
    this.initSplash();
    this.bindStartListener();
  };

  GameView.prototype.initSplash = function () {
    this.splash = new Asteroids.Splash(this.ctx);
    Asteroids.Util.warnFirefox();
    this.splash.loop();
  };

  GameView.prototype.bindStartListener = function () {
    this.buttonHandler = this.handleButton.bind(this);
    this.canvas.addEventListener(
      "mousedown",
      this.buttonHandler
    );
  };

  GameView.prototype.handleButton = function (e) {
    var pos = this.getEventCoordinates(e);
    var x = pos[0], y = pos[1];
    if (this.soundButtonSelected(x, y)) this.sound.on = true;
    this.game.setSound(this.sound);
    if (this.sound.on || this.soundOffSelected(x, y)) this.beginGame();
  };

  GameView.prototype.soundButtonSelected = function (x, y) {
    return Asteroids.Util.between(x, 450, 780) &&
           Asteroids.Util.between(y, 375, 445);
  };

  GameView.prototype.soundOffSelected = function (x, y) {
    return Asteroids.Util.between(x, 450, 780) &&
           Asteroids.Util.between(y, 450, 520);
  };

  GameView.prototype.beginGame = function () {
    this.canvas.removeEventListener("mousedown", this.buttonHandler);
    this.splash.end();
    delete this.splash;
    if (this.sound.on) {
      Asteroids.Sounds.loadGameMusic().play();
    }
    this.game.initialize();
    this.animate();
  };

  GameView.prototype.animate = function () {
    this.frameId = requestAnimationFrame(GameView.prototype.animate.bind(this));
    this.game.draw(this.ctx);
    this.game.step();
    if (this.game.lives === 0) {
      this.gameOverMessage();
      if (!this.handler) this.setRetryHandler();
    } else {
      this.handler = false;
    }
  };

  GameView.prototype.gameOverMessage = function () {
    var ctx = this.ctx;
    ctx.save();
    this.drawGameOver(ctx);
    this.drawRetry(ctx);
    this.drawRank(ctx);
    ctx.restore();
  };

  GameView.prototype.drawGameOver = function (ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y);
    ctx.font = "84px VT323";
    ctx.fillStyle = "yellow";
    ctx.shadowColor = "#f90";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 3;
    var text = "GAME OVER";
    var width = ctx.measureText(text).width;
    ctx.fillText(text, Asteroids.Game.DIM_X / 2 - width / 2, Asteroids.Game.DIM_Y/2 - 160);
  };

  GameView.prototype.drawRank = function (ctx) {
    ctx.font = "132px VT323";
    ctx.fillStyle = "white";
    rank = this.getRank();
    var width = ctx.measureText(rank).width;
    ctx.fillText(rank, Asteroids.Game.DIM_X / 2 - width / 2, Asteroids.Game.DIM_Y/2 + 45);

    ctx.font = "28px VT323";
    ctx.fillStyle = "yellow";
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 2;
    var text = "Your rank is";
    var textWidth = ctx.measureText(text).width;
    ctx.fillText(text, Asteroids.Game.DIM_X / 2 - textWidth / 2, Asteroids.Game.DIM_Y/2 - 60);
  };

  GameView.prototype.drawRetry = function (ctx) {
    ctx.font = "36px VT323";
    ctx.fillStyle = "#ff9";
    var text = "retry";
    var width = ctx.measureText(text).width;
    ctx.fillText(text, Asteroids.Game.DIM_X / 2 - width / 2, Asteroids.Game.DIM_Y/2 + 130);
  };

  GameView.prototype.getRank = function () {
    var points = this.game.points;

    var r1 = 3000,
        r2 = 6000,
        r3 = 10000,
        r4 = 15000,
        r5 = 30000,
        r6 = 50000,
        r7 = 100000,
        r8 = 200000;
    if (points < r1) return "SPACED OUT";
    if (points < r2) return "ASTRO-NOT";
    if (points < r3) return "SPACE GHOST";
    if (points < r4) return "SPACE CADET";
    if (points < r5) return "SPACE INVADER";
    if (points < r6) return "SPACE COWBOY";
    if (points < r7) return "SPACE PIRATE";
    if (points < r8) return "CHEATER";
    return "FILTHY CHEATER";
  };

  GameView.prototype.setRetryHandler = function () {
    this.handler = true;
    this.retryListener = this.handleRetryClick.bind(this);
    this.spaceListener = this.handleSpace.bind(this);
    this.canvas.addEventListener(
      "mousedown",
      this.retryListener
    );
    document.addEventListener(
      "keydown",
      this.spaceListener
    );
  };

  GameView.prototype.handleSpace = function (e) {
    if (e.keyCode === 32) this.restart();
  };

  GameView.prototype.handleRetryClick = function (e) {
    var pos = this.getEventCoordinates(e);
    var x = pos[0], y = pos[1];
    var midX = Asteroids.Game.DIM_X / 2, midY = Asteroids.Game.DIM_Y / 2;
    if (Asteroids.Util.between(x, midX - 40, midX + 40) &&
        Asteroids.Util.between(y, midY + 105, midY + 140))
    {
      this.restart();
    }
  };

  GameView.prototype.getEventCoordinates = function (e) {
    var x, y;
    if (e.x !== undefined && e.y !== undefined) {
      x = e.x;
      y = e.y;
    } else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;
    return [x, y];
  };

  GameView.prototype.restart = function () {
    this.game = new Asteroids.Game();
    cancelAnimationFrame(this.frameId);
    this.canvas.removeEventListener("mousedown", this.retryListener);
    document.removeEventListener("keydown", this.spaceListener);
    this.keyListener.reInit(this.game);
    this.game.initialize();
    this.game.setSound(this.sound);
    this.animate();
  };
})();
