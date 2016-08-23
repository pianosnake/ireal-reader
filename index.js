'use strict';

const unscramble = require('./unscramble');
const musicPrefix = "1r34LbKcu7";
const regex = /.*?irealb:\/\/([^"]*)/;
const parser = require('./parser');

function iRealReader(data){
  const percentEncoded = regex.exec(data);
  const percentDecoded = decodeURIComponent(percentEncoded[1]);
  var parts = percentDecoded.split("===");  //songs are separated by ===
  if(parts.length > 1) this.name = parts.pop();  //playlist name
  this.songs = parts.map(x => new Song(x));
}

function Song(data){
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

function Music(data){
  const parts = data.split(musicPrefix);
  this.raw = unscramble.ireal(parts[1]);

  //TODO: read the time signature
  this.timeSignature = 'T44';

  this.measures = parser(this.raw)
}

module.exports = iRealReader;