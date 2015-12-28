(function(){
  window.Asteroids = window.Asteroids || {};

  var gameView = window.Asteroids.gameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  gameView.prototype.start = function() {
    new Asteroids.KeyListener(this.game);

    this.animate();
  };

  gameView.prototype.animate = function () {
    requestAnimationFrame(gameView.prototype.animate.bind(this));
    this.game.draw(this.ctx);
    this.game.step();
  };
})();
