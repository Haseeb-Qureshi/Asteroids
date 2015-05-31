(function(){
  window.Asteroids = window.Asteroids || {};

  var gameView = window.Asteroids.gameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  gameView.prototype.start = function() {
    var that = this;
    that.bindKeyHandlers();

    setInterval(function () {
      that.game.draw(that.ctx);
      that.game.step();
    }, 20);
  };

  gameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ship;
    key("up", ship.power.bind(ship, [0, -1]) );
    key("down", ship.power.bind(ship, [0, 1]) );
    key("left", ship.power.bind(ship, [-1, 0]) );
    key("right", ship.power.bind(ship, [1, 0]) );
    key("space", ship.fireBullet.bind(ship));
  };
})();
