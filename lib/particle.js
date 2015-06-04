(function(){
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Particle = Asteroids.Particle = function (settings, game) {
    settings = settings || {};
    settings.radius = settings.radius || 5;
    settings.fill = '#F00';
    settings.game = game;
    Asteroids.MovingObject.call(this, settings);
  };

  Asteroids.Particle.SPEED = 12;

  Asteroids.Util.inherits(Particle, Asteroids.MovingObject);

  Particle.prototype.isWrappable = false;

  Particle.prototype.draw = function (ctx) {
    // Do stuff here
  };
})();
