(function(){
  window.Asteroids = window.Asteroids || {};

  var MovingObject = window.Asteroids.MovingObject = function(obj) {
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.radius = obj.radius;
    this.fill = obj.fill;
    this.game = obj.game;
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );
    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.game.isOutOfBounds(this.pos) && this.game.remove(this);
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject){
    var dxSquared = Math.pow(this.pos[0] - otherObject.pos[0], 2);
    var dySquared = Math.pow(this.pos[1] - otherObject.pos[1], 2);
    var distance = Math.sqrt(dxSquared + dySquared);
    var sumRadii = this.radius + otherObject.radius;
    return distance < sumRadii;
  };

})();
