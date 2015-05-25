(function(){
  window.Asteroids = window.Asteroids || {};

  var movingObject = window.Asteroids.movingObject = function(obj) {
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.radius = obj.radius;
    this.color = obj.color;
  };

  movingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
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

  movingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

})();
