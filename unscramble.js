'use strict';

//unscrambling hints from https://github.com/ironss/accompaniser/blob/master/irealb_parser.lua
//strings are broken up in 50 character segments. each segment undergoes character substitution addressed by obfusc50()
exports.ireal = function(s){
  let r = '', p;

  while(s.length > 50){
    p = s.substring(0, 50);
    s = s.substring(50)
    if(s.length < 2){
      r = r + p;
    }else{
      r = r + obfusc50(p);
    }
  }
  r = r + s;
  return r;
}

function obfusc50 (s){
  //the first 5 characters are switched with the last 5
  let newString = s.split('');
  for(let i = 0; i < 5; i++){
    newString[49 - i] = s[i];
    newString[i] = s[49 - i];
  }
  //characters 10-24 are also switched
  for(let i = 10; i < 24; i++){
    newString[49 - i] = s[i];
    newString[i] = s[49 - i];
  }
  return newString.join('');
}
