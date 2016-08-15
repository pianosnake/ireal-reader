'use strict';

const noteValues = {
  'c': 0,
  'c#': 1, 'db': 1,
  'd': 2,
  'd#': 3, 'eb': 3,
  'e': 4,
  'f': 5,
  'f#': 6, 'gb': 6,
  'g': 7,
  'g#': 8, 'ab': 8,
  'a': 9,
  'a#': 10, 'bb': 10,
  'b': 11
};
//TODO: handle alternate chords F-6(F#o7)
//TODO: handle slash chords C^7/G
//TODO: handle comments in chords B*#*

function Chord (name){
  this.name = name.toLowerCase();

  const rootAndQuality = this.getRootAndQuality();
  this.root = rootAndQuality[0];
  this.quality = rootAndQuality[1];
  this.value = noteValues[this.root];

  this.isMinor = this.qualityIsAny('-', '-7', '-6');
  this.isDiminished = this.qualityIsAny('o', 'o7');
  this.isHalfDiminished = this.qualityIsAny('h', 'h7', '7b5');
  this.isDominant = this.qualityIsAny('7');
  this.isMajor = this.qualityIsAny('', '^', '^7', '6');
}

Chord.prototype = {

  distanceDownTo: function(otherChord){
    return (12 + this.value - otherChord.value) % 12;
  },

  getRootAndQuality: function(){
    //root is the root note of the chord  ie: c, eb
    //quality is whatever follows the note ie: o, o7, 7b5
    var qualityNotationBegin = 1;
    if(this.name[1] === "b" || this.name[1] === "#"){
      qualityNotationBegin = 2;
    }
    return [this.name.substring(0, qualityNotationBegin), this.name.substring(qualityNotationBegin)];
  },

  qualityIsAny: function(){
    for(var i = 0, j = arguments.length; i < j; i++){
      if(this.quality === arguments[i]) return true;
    }
    return false;
  }

}

module.exports = Chord;