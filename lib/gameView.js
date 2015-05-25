(function(){
  window.Asteroids = window.Asteroids || {};

  var gameView = window.Asteroids.gameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  gameView.prototype.start = function() {
    setInterval(function () {
      this.game.draw(this.ctx);
      this.game.step();
    }, 20);
  };
})();
