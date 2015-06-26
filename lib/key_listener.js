(function(){
  var KeyListener = window.Asteroids.KeyListener = function(game) {
		this.timers = {};
		this.game = game;
    this.responsiveMs = 60
		this.listen();
	}

	KeyListener.prototype.listen = function() {
		this.listenUp();
		this.listenDown();
	}

	KeyListener.prototype.listenUp = function() {
		var that = this;

		document.onkeyup = function (event) {
			switch (event.keyCode) {
				case 37:
				case 65:
					clearInterval(that.timers['left']);
					delete that.timers['left'];
					break;
				case 39:
				case 68:
					clearInterval(that.timers['right']);
					delete that.timers['right'];
					break;
				case 38:
				case 87:
					clearInterval(that.timers['up']);
					delete that.timers['up'];
					break;
				case 40:
				case 83:
					clearInterval(that.timers['down']);
					delete that.timers['down'];
					break;
				case 32:
					clearInterval(that.timers['fire']);
					delete that.timers['fire'];
					break;
			}
		}
	}

	KeyListener.prototype.listenDown = function () {
		var that = this;

		document.onkeydown = function (event) {
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
		}
	};

  KeyListener.prototype.fire = function() {
    var that = this;
    if (this.timers['fire']) {
      return;
    }
    var ship = this.game.ship;
    ship.fireBullet();
    this.timers['fire'] = setInterval(function () {
      ship.fireBullet();
    }, ship.FIRE_FREQUENCY);
  };

  KeyListener.prototype.setTurnTimer = function (dir) {
    console.log("set turn timer");
    if (this.timers[dir]) {
      return;
    }
    var vector = 0;
    switch(dir) {
      case 'left':
        vector = [-1, 0];
        break;
      case 'right':
        vector = [1, 0];
        break;
      case 'down':
        vector = [0, 1];
        break;
      case 'up':
        vector = [0, -1];
        break;
    }

    var ship = this.game.ship;
    ship.power(vector);
    this.timers[dir] = setInterval(function () {
      ship.throttleAgainst(vector);
      ship.power(vector);
    }, this.responsiveMs)
  };
})();
