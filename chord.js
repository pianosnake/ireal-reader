'use strict';

let noteArray = ['c', null, 'd', null, 'e', 'f', null, 'g', null, 'a', null, 'b'];

function Chord (name){
  this.name = name.toLowerCase();
  this.value = this.getValue();

  var rootAndQuality = this.getRootAndQuality();
  this.root = rootAndQuality[0];
  this.quality = rootAndQuality[1];

  this.isMinor = this.is('-', '-7');
  this.isDiminished = this.is('o', 'o7');
  this.isHalfDiminished = this.is('h', 'h7', '7b5');
  this.isDominant = this.is('7');
  this.isMajor = this.is('');
}

Chord.prototype = {

  distanceDownTo: function(otherChord){
    return (12 + this.value - otherChord.value) % 12;
  },

  getRootAndQuality: function(){
    var qualityNotationBegin = 1;
    if(this.name[1] === "b" || this.name[1] === "#"){
      qualityNotationBegin = 2;
    }
    return [this.name.substring(0, qualityNotationBegin), this.name.substring(qualityNotationBegin)];
  },

  getValue: function(){
    var value = noteArray.indexOf(this.name[0]);
    if(this.name[1] === "b"){
      value--;
    }else if(this.name[1] === "#"){
      value++;
    }
    return value;
  },

  is: function(){
    for(var i = 0, j = arguments.length; i < j; i++){
      if(this.quality === arguments[i]) return true;
    }
    return false;
  }

}

module.exports = Chord;