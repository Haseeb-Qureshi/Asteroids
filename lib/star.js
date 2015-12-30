(function(){
  window.Asteroids = window.Asteroids || {};

  var Star = window.Asteroids.Star = function (x, y, color, createdAt) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.createdAt = createdAt;
  };
})();
