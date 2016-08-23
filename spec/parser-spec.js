'use strict';

const fs = require('fs');
const iRealReader = require('../index');

const iRealData = fs.readFileSync("spec/Tester.html", 'utf8');
const songData = new iRealReader(iRealData);

const testSong = songData.songs[0].music.measures;
const theBreezeAndI = songData.songs[3].music.measures;

console.log('testSong raw', songData.songs[0].music.raw);
console.log('testSong measures', testSong);

describe('iRealPro parser', function(){

  it('should have the right number of measures', function(){
    expect(testSong.length).toEqual(9);
  });

  it('every chord returned should start with A, B, C, D, E, F, or G', function(){
    expect(testSong.every(chord => (/^[a-g]/i).test(chord))).toEqual(true);
  });

  it('should fill in double repeats', function(){
    expect(testSong[2]).toEqual(['C'])
    expect(testSong[3]).toEqual(['C#'])
  });

  it('should fill in invisible slash chords', function(){
    expect(testSong[7]).toEqual(['E/D', 'E/C', 'E/B'])
  });

  it('should fill in single repeats', function(){
    expect(testSong[9][0]).toEqual('Ab')
  });

  it('should handle Kcl repeats correctly', function(){
    expect(theBreezeAndI[2][0]).toEqual('Eb6');
    expect(theBreezeAndI[3][0]).toEqual('Eb6');
    expect(theBreezeAndI[5][0]).toEqual('Db-7');
  });

  it('should handle Kcl repeats correctly', function(){
    expect(theBreezeAndI[2][0]).toEqual('Eb6');
    expect(theBreezeAndI[3][0]).toEqual('Eb6');
    expect(theBreezeAndI[5][0]).toEqual('Db-7');
  });

  it('should handle slash chords correctly', function(){
    expect(theBreezeAndI[10][0]).toEqual('F-7/Bb');
  });


})
