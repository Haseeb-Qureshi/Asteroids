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

  KeyListener.prototype.reInit = function (game) {
    this.game = game;
    this.ship = game.ship;
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
    if (this.timers.fire || !this.ship.visible) return;
    var that = this;
    this.ship.fireBullet();
    this.timers.fire = setInterval(function() {
      if (that.ship.visible) that.ship.fireBullet();
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
    this.timers[dir] = setInterval(this.step.bind(this, vector), this.responsiveMs);
  };

  KeyListener.prototype.step = function (vector) {
    var allDirs = Object.keys(this.timers).slice();
    var fireIdx = allDirs.indexOf("fire");
    if (fireIdx > -1) allDirs.splice(allDirs.indexOf("fire"), 1);
    if (allDirs.length === 1) {
      this.ship.throttleAllBut(vector);
      this.ship.power(vector);
    } else if (allDirs.length > 1) {
      var superVector = allDirs
        .map(this.getVector)
        .reduce(function (acc, vec) {
          return [acc[0] + vec[0] / Math.sqrt(8), acc[1] + vec[1] / Math.sqrt(8)];
        }, [0, 0]);
      this.ship.throttleAllBut(superVector);
      this.ship.power(superVector);
    }
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
