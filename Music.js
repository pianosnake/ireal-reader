'use strict';

const musicPrefix = "1r34LbKcu7";
const unscramble = require('./unscramble');

const parser = require('./Parser');

class Music {
  constructor(data) {
    const parts = data.split(musicPrefix);
    this.raw = unscramble.ireal(parts[1]);
    //TODO: read the time signature
    this.timeSignature = 'T44';
    this.measures = parser(this.raw)
  }
}
module.exports = Music;
