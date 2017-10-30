'use strict';

const Music = require('./Music');
const musicPrefix = "1r34LbKcu7";

class Song {
  constructor(data){
    const parts = data.split(/=+/).filter(x => x != ""); //split on one or more equal signs, remove the blanks
    let offset = 0
    this.title = parts[0];
    this.composer = parts[1];
    this.style = parts[2];
    this.key = parts[3];
    this.transpose = null;
    if(parts[4].indexOf(musicPrefix) !== 0){
      offset = 1;
      this.transpose = parseInt(parts[4]) || null;
    }
    this.music = new Music(parts[4 + offset]);
    this.compStyle = parts[5 + offset] || null;
    this.bpm = parseInt(parts[6 + offset]) || null;
    this.repeats = parseInt(parts[7 + offset]) || null;
  }
}

module.exports = Song;