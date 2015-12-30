(function(){
  window.Asteroids = window.Asteroids || {};

  var MovingObject = window.Asteroids.MovingObject = function(settings) {
    this.pos = settings.pos;
    this.vel = settings.vel;
    this.radius = settings.radius;
    this.fill = settings.fill;
    this.game = settings.game;
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      if (this.game.isOutOfBounds(this.pos)) this.game.remove(this);
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject){
    var distance = Asteroids.Util.distance(this.pos, otherObject.pos);
    var sumRadii = this.radius + otherObject.radius;
    return distance < sumRadii;
  };

})();
