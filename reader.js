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

  this.timeSignature = 'T44';

  this.rawMeasures = this.raw.split(/\||LZ|\{|\}|\[|\]/g) //measures are delimited by |, LZ, {, }, [, ]
    .filter(x => !/^\s*$/.test(x));

  this.measures = computeMeasures(this.raw)


  this.flattenChords = function(){
    var chords = this.measures
      .map(x => chordsOnly(x)) //turn the measures into chords

    return [].concat.apply([], chords) //flatten array
      .filter(x => !/^\s*$/.test(x))  //remove blanks
      .map(x => new Chord(x)); //make chords
  }
}

function computeMeasures(data) {
  //TODO: keep track of repeats when encountering { and }
  return data.split(/\||LZ|\{|\}|\[|\]/g) //measures are delimited by |, LZ, {, }, [, ]
    .filter(x => !/^\s*$/.test(x))  //remove blank measures (created by splitting '} {' for example)
    .map((x, index, array) => chordsOnly(x, index, array))
}

function removeFromString(string, toRemove){
  return string.split(toRemove).join('');
}

function chordsOnly(data, index, array){
  if(data.indexOf('Kcl') > 0 ){ array[index +1] = removeFromString(data, 'Kcl');}
  data = removeFromString(data, /\*\w/); //section markers *A, *B, *C
  data = removeFromString(data, /T\d+/); //time signatures T44, T34
  data = removeFromString(data, /N\d/); //repeat markers N1, N2, ...
  data = removeFromString(data, /<.*>/); //repeat comments in between carrets < ... >
  data = removeFromString(data, 'XyQ'); //empty space marker XyQ
  data = removeFromString(data, 'U'); //empty space marker U
  data = removeFromString(data, 'x'); //repeat previous measure marker x
  data = removeFromString(data, 'Kcl'); //repeat current measure marker Kcl
  data = removeFromString(data, 's'); //unknown marker s
  data = removeFromString(data, 'l'); //unknown marker l
  data = removeFromString(data, 'Y'); //vertical space
  return data
    .split(/\s+|,/) //lastly split on commas or spaces
    .filter(x => !/^\s*$/.test(x)) // filter out blanks
}

module.exports = iRealReader;