'use strict';

//regex:
//  letters A-G and W (W is an invisible slash chord)
//  {1} only one of the aforementioned letters
//  followed by zero or more of these: + - ^ h o # b digit
//  followed by an optional group (to catch slash chords)
//    that starts with a slash
//    followed by A-G
//    followed by optional # or b

const chordRegex = /[A-GW]{1}[\+\-\^\dhob#]*(\/[A-G][#b]?)?/g;
const musicPrefix = "1r34LbKcu7";
const unscramble = require('./unscramble');

class Music {
  constructor(data){
    const parts = data.split(musicPrefix);
    this.raw = unscramble.ireal(parts[1]);
    //TODO: read the time signature
    this.timeSignature = 'T44';
    const musicData = removeNonMusicalInfo(this.raw);
    this.measures = getMeasures(musicData)
  }
}
module.exports = Music;

function getMeasures(data){
  let measures = data.split(/\||LZ|K|Z|\{|\}|\[|\]/g)//measures are delimited by |, LZ, {, } (repeat markers), [, ] (double barlines). Also splitting on K because Kcl seems to indicate a repeat of the previous measure. Z is the end of a song usually.

  measures = fillSingleRepeats(measures);
  measures = fillDoubleRepeats(measures);

  measures = measures.map((x, index, array) => x.match(chordRegex))
    .filter(x => !!x)  //filter out blank measures. if empty measures like N.C. are needed this has to be modified

  measures = fillInvisibleSlashChords(measures);

  return measures;
}

function removeNonMusicalInfo(data){
  //remove all the non-musical information
  data = removeFromString(data, /<.*?>/); //comments delimited by carets < ... >, non-greedy match. do this first as these may contain other symbols that we look for later on.
  data = removeFromString(data, /\*\s*\*/); //stars with empty space in between *  *
  data = removeFromString(data, /\*\w/); //section markers *A, *B, *C
  data = removeFromString(data, /T\d+/); //time signatures T44, T34
  data = removeFromString(data, /N\d/); //repeat markers N1, N2, ...
  data = removeFromString(data, /Y+/); //vertical spacers
  data = removeFromString(data, 'XyQ'); //empty space
  data = removeFromString(data, /[npsUSQ]/); //n: N.C, p: pause slash, U: END, S: Segno, Q: Coda, s: small (consider using s when implementing chord duration)
  return data;
}

function fillDoubleRepeats(measures){
  const r = m => m.indexOf('r') >= 0;

  //an 'r' becomes the two previous measures (drawn as a double angled bar)
  let repeatMeasureIdx = measures.findIndex(r);
  while(repeatMeasureIdx != -1){
    measures.splice(repeatMeasureIdx, 1, measures[repeatMeasureIdx - 2], measures[repeatMeasureIdx - 1]);
    repeatMeasureIdx = measures.findIndex(r);
  }
  return measures;
}

function fillSingleRepeats(measures){
  //the repeat marker is Kcl but we've already split on K, so only cl is left over
  //x appears in its own measure, (drawn as a single angled bar)
  const xcl = m => m.indexOf('x') >= 0 || m.indexOf('cl') >= 0;

  let repeatMeasureIdx = measures.findIndex(xcl);
  while(repeatMeasureIdx != -1){
    measures[repeatMeasureIdx] = measures[repeatMeasureIdx - 1];
    repeatMeasureIdx = measures.findIndex(xcl);
  }
  return measures;
}

function fillInvisibleSlashChords(measures){
  const W = m => m.some(c => c[0] === 'W');

  let invisibleMeasureIdx = measures.findIndex(W);
  while(invisibleMeasureIdx != -1){
    const curMeasure = measures[invisibleMeasureIdx];
    const invisibleChordIdx = curMeasure.findIndex(c => c[0] === 'W')

    if(invisibleChordIdx > 0){
      const previousChord = curMeasure[invisibleChordIdx - 1].split("/")[0];
      curMeasure[invisibleChordIdx] = curMeasure[invisibleChordIdx].replace('W', previousChord);
    }else{
      const previousMeasure = measures[invisibleMeasureIdx - 1];
      const previousChord = previousMeasure[previousMeasure.length - 1].split("/")[0];
      curMeasure[invisibleChordIdx] = curMeasure[invisibleChordIdx].replace('W', previousChord);
    }
    invisibleMeasureIdx = measures.findIndex(W);
  }
  return measures;
}

function removeFromString(string, toRemove){
  return string.split(toRemove).join('');
}

