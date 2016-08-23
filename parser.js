'use strict';

//regex:
//  letters A-G and W (W is an invisible slash chord)
//  {1} only one of the aforementioned letters
//  followed by zero or more of these: + - ^ h o # b digit
//  followed by an optional group (to catch slash chords)
//    that starts with a slash
//    followed by A-G
//    followed by optional # or b

const chordRegex = /[A-GW]{1}[\+\-\^ho\d#b]*(\/[A-G][#b]?)?/g;

module.exports = function(data){
  data = removeFromString(data, /<.*?>/); //comments delimited by carets < ... >, non-greedy match. do this first as these may contain other symbols that we look for later on.
  data = removeFromString(data, /\*\s*\*/); //stars with empty space in between *  *
  data = removeFromString(data, /\*\w/); //section markers *A, *B, *C
  data = removeFromString(data, /T\d+/); //time signatures T44, T34
  data = removeFromString(data, /N\d/); //repeat markers N1, N2, ...
  data = removeFromString(data, /Y+/); //vertical spacers
  data = removeFromString(data, 'XyQ'); //empty space
  data = removeFromString(data, /[npsUSQ]/); //n: N.C, p: pause slash, U: END, S: Segno, Q: Coda, s: small (consider using s when implementing chord duration)

  var measures = data.split(/\||LZ|K|Z|\{|\}|\[|\]/g)//measures are delimited by |, LZ, {, } (repeat markers), [, ] (double barlines). Also splitting on K because Kcl seems to indicate a repeat of the previous measure. Z is the end of a song usually.

  measures = fillSingleRepeats(measures);
  measures = fillDoubleRepeats(measures);

  measures = measures.map((x, index, array) => x.match(chordRegex))
    .filter(x => !!x)  //filter out blank measures. if empty measures like N.C. are needed this has to be modified

  measures = fillInvisibleSlashChords(measures);

  return measures;
}

function fillDoubleRepeats (measures){
  //an 'r' becomes the two previous measures (double angled bar)
  var repeatMeasureIdx = measures.findIndex(m =>{ return m.indexOf('r') >= 0 });
  while(repeatMeasureIdx != -1){
    measures.splice(repeatMeasureIdx, 1, measures[repeatMeasureIdx - 2], measures[repeatMeasureIdx - 1]);
    repeatMeasureIdx = measures.findIndex(m =>{ return m.indexOf('r') >= 0 });
  }
  return measures;
}

function fillSingleRepeats (measures){
  //the repeat marker is Kcl but we've already split on K, so only cl is left over
  //x appears in its own measure
  var repeatMeasureIdx = measures.findIndex(m =>{ return m.indexOf('x') >= 0 || m.indexOf('cl') >= 0 });
  while(repeatMeasureIdx != -1){
    measures[repeatMeasureIdx] = measures[repeatMeasureIdx - 1];
    repeatMeasureIdx = measures.findIndex(m =>{ return m.indexOf('x') >= 0 || m.indexOf('cl') >= 0 });
  }
  return measures;
}

function fillInvisibleSlashChords (measures){
  var invisibleMeasureIdx = measures.findIndex(m => m.some(c => c[0] === 'W'));
  while(invisibleMeasureIdx != -1){
    var curMeasure = measures[invisibleMeasureIdx];
    var invisibleChordIdx = curMeasure.findIndex(c => c[0] === 'W')

    if(invisibleChordIdx > 0){
      var previousChord = curMeasure[invisibleChordIdx - 1].split("/")[0];
      curMeasure[invisibleChordIdx] = curMeasure[invisibleChordIdx].replace('W', previousChord);
    }else{
      var previousMeasure = measures[invisibleMeasureIdx - 1];
      var previousChord = previousMeasure[previousMeasure.length - 1].split("/")[0];
      curMeasure[invisibleChordIdx] = curMeasure[invisibleChordIdx].replace('W', previousChord);
    }
    invisibleMeasureIdx = measures.findIndex(m => m.some(c => c[0] === 'W'));
  }
  return measures;
}

function removeFromString (string, toRemove){
  return string.split(toRemove).join('');
}
