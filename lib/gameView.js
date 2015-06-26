(function(){
  window.Asteroids = window.Asteroids || {};

  var gameView = window.Asteroids.gameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  gameView.prototype.start = function() {
    var that = this;
    new Asteroids.KeyListener(this.game);

    setInterval(function () {
      that.game.draw(that.ctx);
      that.game.step();
    }, 20);
  };
})();
