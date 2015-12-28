(function(){
  window.Asteroids = window.Asteroids || {};

  var GameView = window.Asteroids.GameView = function(ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
    this.gameOver = false;
  };

  GameView.prototype.start = function() {
    new Asteroids.KeyListener(this.game);
    this.animate();
  };

  GameView.prototype.animate = function () {
    requestAnimationFrame(GameView.prototype.animate.bind(this));
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
    var game = this.game;
    ctx.save();
    ctx.font = "72px VT323";
    ctx.fillStyle = "yellow";
    ctx.shadowColor = "#f90";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 3;
    ctx.fillText("GAME OVER", game.DIM_X/2 - 100, game.DIM_Y/2);
    ctx.font = "36px VT323";
    ctx.fillText("Retry", game.DIM_X / 2, game.DIM_Y/2 + 65);
    ctx.restore();
  };

  GameView.prototype.setRetryHandler = function () {
    this.handler = true;
    var canvas = document.getElementById("game-canvas");
    canvas.addEventListener("mousedown", this.handleRetryClick.bind(this));
  };

  GameView.prototype.handleRetryClick = function (e) {
    var x, y;
    var canvas = document.getElementById("game-canvas");
    if (e.x !== undefined && e.y !== undefined) {
      x = e.x;
      y = e.y;
    } else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    console.log([x, y]);
    console.log("DIM_X: " + (this.game.DIM_X / 2) + " DIM_Y: " + (this.game.DIM_Y / 2 + 65));
    if (x > this.game.DIM_X / 2 && x < this.game.DIM_X / 2 + 200 &&
        y > this.game.DIM_Y / 2 && y < this.game.DIM_Y / 2 + 70)
    {
      this.restart();
    }
  };

  GameView.prototype.restart = function () {
    this.game = new Asteroids.Game();
  };
})();
