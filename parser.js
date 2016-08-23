'use strict';
//TODO: keep track of repeats when encountering { and }


module.exports = function(data){
  data = removeFromString(data, /<.*?>/); //first remove comments. delimited by carets < ... >, non-greedy match. these may contain other symbols that we look for later on.
  data = removeFromString(data, /\*\s*\*/); //remove stars with empty space in between *  *

  var measures =  data.split(/\||LZ|K|Z|\{|\}|\[|\]/g)//measures are delimited by |, LZ, {, } (repeat markers), [, ] (double barlines). Also splitting on K because Kcl seems to indicate a repeat of the previous measure. Z is the end of a song usually.
    .map((x, index, array) => chordsOnly(x, index, array))
    .filter(x => !/^\s*$/.test(x))  //filter out blank measures

  measures = fillDoubleRepeats(measures);
  measures = fillInvisibleSlashChords(measures);
  return measures;
}

function fillDoubleRepeats(measures){
  //an 'r' becomes the two previous measures (double angled bar)
  var repeatMeasureIdx = measures.findIndex(m => m[0] === 'r');
  while(repeatMeasureIdx != -1){
    measures.splice(repeatMeasureIdx, 1, measures[repeatMeasureIdx-2], measures[repeatMeasureIdx-1]);
    repeatMeasureIdx = measures.findIndex(x => x && x[0] === 'r');
  }
  return measures;
}

function fillInvisibleSlashChords(measures){
  var invisibleMeasureIdx = measures.findIndex(m => m.some(c => c[0] === 'W'));
  while(invisibleMeasureIdx != -1){
    var curMeasure = measures[invisibleMeasureIdx];
    var invisibleChordIdx = curMeasure.findIndex(c => c[0] === 'W')
    
    if(invisibleChordIdx>0){
      var previousChord = curMeasure[invisibleChordIdx-1].split("/")[0];
      curMeasure[invisibleChordIdx] = curMeasure[invisibleChordIdx].replace('W', previousChord);
    }else{
      var previousMeasure = measures[invisibleMeasureIdx-1];
      var previousChord = previousMeasure[previousMeasure.length-1].split("/")[0];
      curMeasure[invisibleChordIdx] = curMeasure[invisibleChordIdx].replace('W', previousChord);
    }
    invisibleMeasureIdx = measures.findIndex(m => m.some(c => c[0] === 'W'));
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
  data = removeFromString(data, 'XyQ'); //empty space marker XyQ
  data = removeFromString(data, 'U'); //Ending measure for the player
  data = removeFromString(data, 'S'); //Segno
  data = removeFromString(data, 'Kcl'); //repeat current measure marker Kcl
  data = removeFromString(data, 'x'); //repeat previous measure marker x
  data = removeFromString(data, 'Q'); //Coda
  data = removeFromString(data, 's'); //Small
  data = removeFromString(data, 'n'); //N.C. no chord marker n
  data = removeFromString(data, 'p'); //pause, indicated by a slash
  data = removeFromString(data, 'n'); //N.C. no chord marker n
  data = removeFromString(data, 'l'); //unknown marker l
  data = removeFromString(data, 'Y'); //vertical spacer
  return data
    .split(/\s+|,/) //lastly split on commas or spaces
    .filter(x => !/^\s*$/.test(x)) // filter out blank chords
}