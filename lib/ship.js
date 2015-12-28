(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Ship = Asteroids.Ship = function (game) {
    var settings = {
      radius: 15,
      fill: '#F00',
      vel: [0, 0],
      pos: [400, 400],
      game: game
    };
    Asteroids.MovingObject.call(this, settings);
    this.MAX_SPEED = 15;
    this.FIRE_FREQUENCY = 100;
    this.IMPULSE_SCALING = 0.5;
    this.THROTTLE = 0.82;
    this.points = 0;
    this.interval = 0;
    this.visible = true;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.destroy = function () {
    this.game.addExplosion(8, this.pos, this.radius, "ship");
    this.game.loseLife();
    this.visible = false;
    var that = this;
    setTimeout(function () {
      that.pos = that.game.fairRandomPosition("ship");
      that.vel = [0,0];
      setTimeout(function () {
        if (that.game.lives > 0) {
          that.game.reviveAnimation(that.pos);
          that.visible = true;
        }
      }, 100);
    }, 1000);
  };

  Ship.prototype.power = function (impulse) {
    if (!this.visible) return;
    var scaled = this.scaleVector(impulse);
    if (Math.abs(this.vel[0]) <= this.MAX_SPEED &&
        Math.abs(this.vel[0] + scaled[0]) <= this.MAX_SPEED) {
      this.vel[0] += scaled[0];
    }
    if (Math.abs(this.vel[1]) <= this.MAX_SPEED &&
        Math.abs(this.vel[1] + scaled[1]) <= this.MAX_SPEED) {
      this.vel[1] += scaled[1];
    }
    this.produceParticles();
  };

  Ship.prototype.produceParticles = function () {
    this.interval++;
    if (this.interval % 1 === 0) {
      this.interval = 0;
      this.game.generateParticle(this.pos.slice(), this.noisyReverseVel());
    }
  };

  Ship.prototype.throttleAllBut = function (vector) {
    if (vector) {
      this.vel[this.zeroIndex(vector)] *= this.THROTTLE;
    } else {
      this.vel.map(function (velVector) {
        return velVector * 0.4;
      });
    }
  };

  Ship.prototype.powerDiagonal = function (allVectors) {
    this.throttleAllBut(null);
    var that = this;
    allVectors.forEach(function (vec) {
      if (vec) that.power(that.scaleVector(vec));
    });
  };

  Ship.prototype.fireBullet = function () {
    var shipVel = this.vel.slice();
    var shipPos = this.pos.slice();
    var bullet = new Asteroids.Bullet(
      shipPos,
      this.bulletVelocity(),
      this.game
    );
    this.game.add(bullet);
  };

  Ship.prototype.bulletVelocity = function() {
    if (this.zeroVel()) {
      return [Math.cos(this.getAngle()) * Asteroids.Bullet.SPEED * -1,
              Math.sin(this.getAngle()) * Asteroids.Bullet.SPEED * -1];
    }

    var velocity = Math.sqrt(this.vel.reduce(function (sum, vec) {
      return sum + vec * vec;
    }, 0));

    return this.vel.map(function (vec) {
      return vec / velocity * Asteroids.Bullet.SPEED;
    });
  };

  Ship.prototype.draw = function (ctx) {
    if (!this.visible) return;

    ctx.save();
    this.drawTriangle(ctx);
    ctx.restore();
  };

  Ship.prototype.drawTriangle = function (ctx) {
    ctx.beginPath();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.getAngle() + Math.PI);
    ctx.moveTo(this.radius, 0);
    var vertices = [];
    var a = ((Math.PI * 2)/3);
    for (var i = 1; i <= 3; i++) {
      vertices.push([this.radius * Math.cos(a * i), this.radius * Math.sin(a * i)]);
      ctx.lineTo(vertices[i - 1][0], vertices[i - 1][1]);
    }

    this.colorTriangle(ctx, vertices);
  };

  Ship.prototype.colorTriangle = function (ctx, vertices) {
    var grd = ctx.createLinearGradient(0, 0, vertices[2][0], vertices[2][1]);
    grd.addColorStop(0, "#511");
    grd.addColorStop(1, "#F00");
    if (!this.zeroVel) {
      ctx.shadowColor = "yellow";
      var os = this.radius * 2;
      ctx.shadowOffsetX = this.pos[0] - (this.vel[0] > 0 ? this.vel[0] + os : this.vel[0] - os);
      ctx.shadowOffsetY = this.pos[1] - (this.vel[1] > 0 ? this.vel[1] + os : this.vel[1] - os);
      ctx.shadowBlur = 10;
    }
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  };

  Ship.prototype.getAngle = function () {
    var angle = Math.atan2(this.vel[1], this.vel[0]) + Math.PI;
    if (this.zeroVel()) {
      return this.lastAngle || Math.PI / 2;
    } else {
      this.lastAngle = angle;
      return this.lastAngle;
    }
  };

  Ship.prototype.scaleVector = function (vector) {
    var that = this;
    return vector.map(function (vel) { return vel * that.IMPULSE_SCALING; });
  };

  Ship.prototype.noisyReverseVel = function () {
    return this.reverseVel().map(function (vec) {
      return vec + (0.5 - Math.random());
    });
  };

  Ship.prototype.reverseVel = function () {
    return this.vel.map(function (vec) {
      return vec * -0.5;
    });
  };

  Ship.prototype.zeroVel = function () {
    return this.vel[0] === 0 && this.vel[1] === 0;
  };

  Ship.prototype.zeroIndex = function (vector) {
    var absVector = vector.slice().map(Math.abs);
    return absVector.indexOf(0);
  };
})();
