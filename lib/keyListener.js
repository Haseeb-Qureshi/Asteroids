(function() {
  var KeyListener = window.Asteroids.KeyListener = function(game) {
    this.timers = {};
    this.game = game;
    this.responsiveMs = 60;
    this.listen();
    this.ship = this.game.ship;
  };

  KeyListener.prototype.listen = function() {
    this.listenUp();
    this.listenDown();
  };

  KeyListener.prototype.listenUp = function() {
    var that = this;

    document.onkeyup = function(event) {
      switch (event.keyCode) {
        case 37:
        case 65:
          clearInterval(that.timers.left);
          delete that.timers.left;
          break;
        case 39:
        case 68:
          clearInterval(that.timers.right);
          delete that.timers.right;
          break;
        case 38:
        case 87:
          clearInterval(that.timers.up);
          delete that.timers.up;
          break;
        case 40:
        case 83:
          clearInterval(that.timers.down);
          delete that.timers.down;
          break;
        case 32:
          clearInterval(that.timers.fire);
          delete that.timers.fire;
          break;
      }
    };
  };

  KeyListener.prototype.listenDown = function() {
    var that = this;

    document.onkeydown = function(event) {
      switch (event.keyCode) {
        case 65:
        case 37:
          that.setTurnTimer('left');
          break;
        case 39:
        case 68:
          that.setTurnTimer('right');
          break;
        case 38:
        case 87:
          that.setTurnTimer('up');
          break;
        case 40:
        case 83:
          that.setTurnTimer('down');
          break;
        case 32:
          that.fire();
          break;
      }
    };
  };

  KeyListener.prototype.fire = function() {
    if (this.timers.fire || !this.ship.visible ) {
      return;
    }
    var that = this;
    this.ship.fireBullet();
    this.timers.fire = setInterval(function() {
      that.ship.fireBullet();
    }, this.ship.FIRE_FREQUENCY);
  };

  KeyListener.prototype.setTurnTimer = function(dir) {
    if (this.timers[dir]) {
      return;
    }
    var vector = this.getVector(dir);

    var ship = this.game.ship;
    this.ship.power(vector);
    var that = this;
    this.timers[dir] = setInterval(function() {
      var allDirs = Object.keys(that.timers);
      if (allDirs.length === 1) {
        that.ship.throttleAllBut(vector);
        that.ship.power(vector);
      } else if (allDirs.length > 1) {
        var allVectors = allDirs.map(that.getVector);
        that.ship.powerDiagonal(allVectors);
      }
    }, this.responsiveMs);
  };

  KeyListener.prototype.getVector = function(dir) {
    switch (dir) {
      case 'left':
        return [-1, 0];
      case 'right':
        return [1, 0];
      case 'down':
        return [0, 1];
      case 'up':
        return [0, -1];
    }
  };
})();
