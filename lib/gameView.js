(function(){
  window.Asteroids = window.Asteroids || {};

  var gameView = window.Asteroids.gameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  gameView.prototype.start = function() {
    var that = this;
    setInterval(function () {
      that.game.draw(that.ctx);
      that.game.step();
      that.bindKeyHandlers();
    }, 20);
  };

  gameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ship;
    key("up", ship.power.bind(ship, [0, -0.01]) );
    key("down", ship.power.bind(ship, [0, 0.01]) );
    key("left", ship.power.bind(ship, [-0.01, 0]) );
    key("right", ship.power.bind(ship, [0.01, 0]) );

  };
})();
