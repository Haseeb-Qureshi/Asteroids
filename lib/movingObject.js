(function(){
  window.Asteroids = window.Asteroids || {};

  var MovingObject = window.Asteroids.MovingObject = function(obj) {
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.radius = obj.radius;
    this.color = obj.color;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
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
    this.pos = this.game.wrap(this.pos);
  };

  MovingObject.prototype.isCollidedWith = function (otherObject){
    var dxSquared = Math.pow(this.pos[0] - otherObject.pos[0], 2);
    var dySquared = Math.pow(this.pos[1] - otherObject.pos[1], 2);
    var distance = Math.sqrt(dxSquared + dySquared);
    var sumRadii = this.radius + otherObject.radius;
    return distance < sumRadii;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    // if (this.isCollidedWith(otherObject) ) {
    //   this.game.remove(otherObject);
    //   this.game.remove(this);
    // }
  };

})();
