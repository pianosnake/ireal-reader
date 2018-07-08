'use strict';

const fs = require('fs');
const iRealReader = require('../index');

const iRealData = fs.readFileSync("spec/Tester.html", 'utf8');
const songData = new iRealReader(iRealData);

const testSong = songData.songs[0].music.measures;
const theBreezeAndI = songData.songs[3].music.measures;
const imagination = songData.songs[4].music.measures;
const forJan = songData.songs[5].music.measures;
const allOfMe = songData.songs[6].music.measures;

describe('iRealPro parser', function(){

  it('should have the right number of measures', function(){
    expect(testSong.length).toEqual(11);
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

  it('should handle slash chords correctly', function(){
    expect(theBreezeAndI[10][0]).toEqual('F-7/Bb');
    expect(imagination[13][1]).toEqual('A7b9/C#')
  });

  it('should handle altered chords correctly', function(){
    expect(forJan[0][0]).toEqual('Bb^7#11');
    expect(forJan[2][0]).toEqual('A7b9b13');
    expect(forJan[13][0]).toEqual('E7b13/G#');
  });

  it('should handle add/sus chords correctly', function(){
    expect(allOfMe[2][0]).toEqual('Eadd9');
    expect(allOfMe[4][0]).toEqual('Asus');
    expect(allOfMe[4][1]).toEqual('A7susadd3');
  });

})
