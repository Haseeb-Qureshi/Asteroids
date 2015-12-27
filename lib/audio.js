(function () {
  window.Asteroids = window.Asteroids || {};
  var Asteroids = window.Asteroids;

  var Sounds = Asteroids.Sounds = function (game) {
    this.game = game;
  };

  Sounds.prototype.loadMusic = function () {
    var music = new Audio('./assets/sound/Virt_-_Katamari_Damacy.mp3');
    music.load();
    music.loop = true;
    return music;
  };

  Sounds.prototype.buildSoundPool = function (maxSize) {
    this.explosions = [];
    this.bullets = [];

    for (var i = 0; i < 2; i++) {
      for (var j = 1; j <= 5; j++) {
        var explosion = new Audio(
          './assets/sound/explosion' + j + ((j < 4) ? '.wav' : '.mp3')
        );
        explosion.volume = 0.5;
        explosion.load();
        this.explosions.push(explosion);
      }
    }

    for (i = 0; i < 5; i++) {
      var bullet = new Audio('./assets/sound/fireBullet.wav');
      bullet.load();
      this.bullets.push(bullet);
    }
    this.levelUp = new Audio('./assets/sound/levelUp.wav');
    this.death = new Audio('./assets/sound/death.mp3');
    this.deathsplosion = new Audio('./assets/sound/deathsplosion.mp3');

    this.levelUp.load();
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
      sound.load();
    });
  };

  Sounds.prototype.playSound = function (sound) {
    if (sfxOn) {
      switch(sound) {
        case 'levelUp':
          this.loadSound(this.soundPool.levelUp);
          break;
        case 'laser':
          this.playSoundFromPool(this.soundPool.bullets);
          break;
        case 'death':
          this.loadSound(this.soundPool.death);
          this.loadSound(this.soundPool.deathsplosion);
          break;
        case 'explosion':
          this.playSoundFromPool(this.soundPool.explosions);
          break;
      }
    }
  };
})();
