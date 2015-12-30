(function () {
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Sounds = Asteroids.Sounds = function (game) {
    this.game = game;
  };

  Sounds.loadGameMusic = function () {
    var music = new Audio('./assets/sound/ikarugaloop.mp3');
    music.loop = true;
    music.volume = 0.7;
    music.load();
    return music;
  };

  Sounds.prototype.buildSoundPool = function (maxSize) {
    this.explosions = [];
    for (var i = 1; i <= 5; i++) {
      var explosion = new Audio(
        './assets/sound/explosion' + i + ((i <= 3) ? '.wav' : '.mp3')
      );
      explosion.volume = 0.2;
      explosion.load();
      this.explosions.push(explosion);
    }

    this.bullets = [];
    for (i = 0; i < 5; i++) {
      var bullet = new Audio('./assets/sound/fireBullet.wav');
      bullet.volume = 0.7;
      bullet.defaultPlaybackRate = 1.5;
      bullet.load();
      this.bullets.push(bullet);
    }
    this.item = new Audio('./assets/sound/levelUp.wav');
    this.item.volume = 0.7;
    this.death = new Audio('./assets/sound/death.mp3');
    this.death.volume = 0.7;
    this.deathsplosion = new Audio('./assets/sound/deathsplosion.mp3');
    this.deathsplosion.volume = 0.7;

    this.item.load();
    this.death.load();
    this.deathsplosion.load();

    return this;
  };

  Sounds.prototype.playSoundFromPool = function (pool) {
    var startInd = Math.floor(Math.random() * pool.length); //randomizes explosions sound
    for (var i = 0; i < pool.length; i++) {
      var index = (startInd + i) % pool.length;
      if (pool[index].currentTime === 0) {
        return this.loadSound(pool[index]);
      }
    }
  };

  Sounds.prototype.loadSound = function (sound) {
    sound.play();
    sound.addEventListener('ended', function(s) {
      sound.currentTime = 0;
    });
  };

  Sounds.prototype.playSound = function (sound) {
    switch(sound) {
      case 'item':
        this.loadSound(this.item);
        break;
      case 'laser':
        this.playSoundFromPool(this.bullets);
        break;
      case 'death':
        this.loadSound(this.death);
        this.loadSound(this.deathsplosion);
        break;
      case 'explosion':
        this.playSoundFromPool(this.explosions);
        break;
    }
  };
})();
