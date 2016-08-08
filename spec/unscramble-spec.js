'use strict';

const unscramble = require('../unscramble');

describe('unscrambling iReal songs', function(){
  let scrambled;
  let unscrambled;
  
  it('should work with strings of 52 characters', function(){
    scrambled = '[T44A BLZC DLZE FLZG, ALZA BLZC DLZE FLZG ALZA B | ';
    unscrambled = '[T44A BLZC DLZE FLZG, ALZA BLZC DLZE FLZG ALZA B | ';
    expect(unscramble.ireal(scrambled)).toEqual(unscrambled);
  });

  it('should work with strings over 52 characters', function(){
    scrambled = '| B A BLZCZLF EZLD CZLB ZALA ,GZLF EZLD G ALZA44T[C ';
    unscrambled = '[T44A BLZC DLZE FLZG, ALZA BLZC DLZE FLZG ALZA B |C ';
    expect(unscramble.ireal(scrambled)).toEqual(unscrambled);
  });

  it('should work with strings of 100 characters', function(){
    scrambled = 'ZLB A BLZCZLF EZLD CZLB ZALA ,GZLF EZLD G ALZA44T[C- DLZE FLZG A,LZA BLZC DLZE FLZG ALZA BLZC- D |E ';
    unscrambled = '[T44A BLZC DLZE FLZG, ALZA BLZC DLZE FLZG ALZA BLZC- DLZE FLZG A,LZA BLZC DLZE FLZG ALZA BLZC- D |E ';
    expect(unscramble.ireal(scrambled)).toEqual(unscrambled);
  });

  it('should work with strings over 100 characters', function(){
    scrambled = 'ZLB A BLZCZLF EZLD CZLB ZALA ,GZLF EZLD G ALZA44T[ EZLDZE FLB AZLA GZLF EZDL CZLB AZL,A GZLZC- LD -CF ';
    unscrambled = '[T44A BLZC DLZE FLZG, ALZA BLZC DLZE FLZG ALZA BLZC- DLZE FLZG A,LZA BLZC DLZE FLZG ALZA BLZC- DLZE F ';
    expect(unscramble.ireal(scrambled)).toEqual(unscrambled);
  });
});