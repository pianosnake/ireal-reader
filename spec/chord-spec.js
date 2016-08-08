'use strict';

const Chord = require('../chord');

describe('Chord', function(){
  var cMajor, dDominant, eMajor, fDiminished, gHalfDiminished, gMajor, aMinor, aSharpMinor, bFlatMinor;

  beforeEach(function(){
    cMajor = new Chord("C");
    dDominant = new Chord('D7');
    eMajor = new Chord('E');
    fDiminished = new Chord('Fo7');
    gHalfDiminished = new Chord('Gh7')
    gMajor = new Chord('G')
    aMinor = new Chord('A-');
    aSharpMinor = new Chord('A#-');
    bFlatMinor = new Chord('Bb-');
  });

  describe('major', function(){
    it('should have the right qualities', function(){
      expect(cMajor.name).toEqual('c');
      expect(cMajor.isMinor).toEqual(false);
      expect(cMajor.isDominant).toEqual(false);
      expect(cMajor.isMajor).toEqual(true);
      expect(cMajor.isDiminished).toEqual(false);
      expect(cMajor.isHalfDiminished).toEqual(false);
      expect(cMajor.value).toEqual(0);

      expect(eMajor.name).toEqual('e');
      expect(eMajor.isMinor).toEqual(false);
      expect(eMajor.isDominant).toEqual(false);
      expect(eMajor.isMajor).toEqual(true);
      expect(eMajor.isDiminished).toEqual(false);
      expect(eMajor.isHalfDiminished).toEqual(false);
      expect(eMajor.value).toEqual(4);
    });
  });


  describe('dominant', function(){
    it('should have the right qualities', function(){
      expect(dDominant.name).toEqual('d7');
      expect(dDominant.isMinor).toEqual(false);
      expect(dDominant.isDominant).toEqual(true);
      expect(dDominant.isMajor).toEqual(false);
      expect(dDominant.isDiminished).toEqual(false);
      expect(dDominant.isHalfDiminished).toEqual(false);
      expect(dDominant.value).toEqual(2);
    });
  });


  describe('minor', function(){
    it('should have the right qualities', function(){
      expect(aMinor.name).toEqual('a-');
      expect(aMinor.isMinor).toEqual(true);
      expect(aMinor.isDominant).toEqual(false);
      expect(aMinor.isMajor).toEqual(false);
      expect(aMinor.isDiminished).toEqual(false);
      expect(aMinor.isHalfDiminished).toEqual(false);
      expect(aMinor.value).toEqual(9);

      expect(aSharpMinor.name).toEqual('a#-');
      expect(aSharpMinor.isMinor).toEqual(true);
      expect(aSharpMinor.isDominant).toEqual(false);
      expect(aSharpMinor.isMajor).toEqual(false);
      expect(aSharpMinor.isDiminished).toEqual(false);
      expect(aSharpMinor.isHalfDiminished).toEqual(false);
      expect(aSharpMinor.value).toEqual(10);

      expect(bFlatMinor.name).toEqual('bb-');
      expect(bFlatMinor.isMinor).toEqual(true);
      expect(bFlatMinor.isMajor).toEqual(false);
      expect(bFlatMinor.isDominant).toEqual(false);
      expect(bFlatMinor.isDiminished).toEqual(false);
      expect(bFlatMinor.isHalfDiminished).toEqual(false);
      expect(bFlatMinor.value).toEqual(10);
    });
  });


  describe('diminished', function(){
    it('should have the right qualities', function(){
      expect(fDiminished.name).toEqual('fo7');
      expect(fDiminished.isMinor).toEqual(false);
      expect(fDiminished.isDominant).toEqual(false);
      expect(fDiminished.isMajor).toEqual(false);
      expect(fDiminished.isDiminished).toEqual(true);
      expect(fDiminished.isHalfDiminished).toEqual(false);
      expect(fDiminished.value).toEqual(5);
    });
  });

  describe('half diminished', function(){
    it('should have the right qualities', function(){
      expect(gHalfDiminished.name).toEqual('gh7');
      expect(gHalfDiminished.isMinor).toEqual(false);
      expect(gHalfDiminished.isDominant).toEqual(false);
      expect(gHalfDiminished.isMajor).toEqual(false);
      expect(gHalfDiminished.isDiminished).toEqual(false);
      expect(gHalfDiminished.isHalfDiminished).toEqual(true);
      expect(gHalfDiminished.value).toEqual(7);
    });
  });

  describe('#distanceTo', function(){
    it('should compute the distance going down in semitones from the first chord to the second chord', function(){
      expect(aMinor.distanceDownTo(fDiminished)).toEqual(4);
      expect(fDiminished.distanceDownTo(aMinor)).toEqual(8);
      expect(cMajor.distanceDownTo(fDiminished)).toEqual(7);
      expect(aMinor.distanceDownTo(dDominant)).toEqual(7);
      expect(dDominant.distanceDownTo(gMajor)).toEqual(7);
    });
  });

});