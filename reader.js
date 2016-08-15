'use strict';

const unscramble = require('./unscramble');
const musicPrefix = "1r34LbKcu7";
const Chord = require('./chord');
const regex = /.*?irealb:\/\/([^"]*)/;

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

  this.measures = createMeasures(this.raw)

  this.flattenChords = function(){
    return [].concat.apply([], this.measures) //flatten array
      .map(x => new Chord(x)); //make chords
  }
}

function createMeasures(data) {
  //TODO: keep track of repeats when encountering { and }

    var measures =  data.split(/\||LZ|K|Z|\{|\}|\[|\]/g)//measures are delimited by |, LZ, {, } (repeat markers), [, ] (double barlines). Also splitting on K because Kcl seems to indicate a repeat of the previous measure. Z is the end of a song usually.
    .map((x, index, array) => chordsOnly(x, index, array))
    .filter(x => !/^\s*$/.test(x))  //filter out blank measures

  return fillInRepeats(measures);
}

function fillInRepeats(measures){
  var repeatMeasure = measures.findIndex(x => x[0] === 'r');
  while(repeatMeasure != -1){
    measures.splice(repeatMeasure, 1, measures[repeatMeasure-2], measures[repeatMeasure-1]);
    repeatMeasure = measures.findIndex(x => x && x[0] === 'r');
  }
  return measures;
}

function removeFromString(string, toRemove){
  return string.split(toRemove).join('');
}

function chordsOnly(data, index, array){
  if(data.indexOf('cl') === 0 ){ data = array[index-1]; } //Kcl is a repeat of whatever measure it's in. We've already split on the K's
  if(data.indexOf('x') >= 0 ){ data = array[index-1]; } //x is a repeat of the measure before
  data = removeFromString(data, /\*\w/); //section markers *A, *B, *C
  data = removeFromString(data, /T\d+/); //time signatures T44, T34
  data = removeFromString(data, /N\d/); //repeat markers N1, N2, ...
  data = removeFromString(data, /<.*>/); //repeat comments in between carrets < ... >
  data = removeFromString(data, 'XyQ'); //empty space marker XyQ
  data = removeFromString(data, 'U'); //empty space marker U
  data = removeFromString(data, 'Kcl'); //repeat current measure marker Kcl
  data = removeFromString(data, 'x'); //repeat previous measure marker x
  data = removeFromString(data, 'Q'); //coda marker
  data = removeFromString(data, 's'); //unknown marker s
  data = removeFromString(data, 'l'); //unknown marker l
  data = removeFromString(data, 'Y'); //vertical spacer
  return data
    .split(/\s+|,/) //lastly split on commas or spaces
    .filter(x => !/^\s*$/.test(x)) // filter out blanks
}

module.exports = iRealReader;