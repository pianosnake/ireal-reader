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


describe('complete song tests', function () {
  it('should contain the correct chords for Jan', () => {
    expect(forJan).toEqual([
      ['Bb^7#11'], ['E7alt'], ['A7b9b13'], ['D-9'],
      ['E7b9b13'], ['E7b9b13'], ['A-7'], ['F^7#11'],
      ['Bb^7#11'], ['E7alt'], ['A7b9b13'], ['Ab7#5'],
      ['C9#5/G', 'C9#5/F#'], ['E7b13/G#'], ['A-7'], ['B7#9#5'],
      ['E-11'], ['D-11'], ['C-11'], ['Bb^7#11'],
      ['E7alt'], ['E7alt'], ['A^7'], ['A^7']]);
  });

  it('should contain the correct chords for Imagination', () => {
    expect(imagination).toEqual([
      ['Eb^7', 'Eo7'], ['F-7', 'Bb7'], ['Eb^7', 'Ab^7'], ['Gh7', 'C7b9'],
      ['F-7', 'C7b13'], ['F-7', 'Bb7'], ['G7', 'C7'], ['F-7', 'Bb7'],
      ['Eb^7', 'Eo7'], ['F-7', 'Bb7'], ['Eb^7', 'Ab^7'], ['Gh7', 'C7b9'],
      ['F-7', 'C7b13'], ['F-7', 'Bb7'], ['Eb^7'], ['Bb-7', 'Eb7'],
      ['Ab^7', 'F-7'], ['Ah7', 'D7b9'], ['G-7'], ['C7', 'A7b9/C#'],
      ['D-7', 'G-7'], ['C-7', 'F7'], ['D-7', 'G-7'], ['C-7', 'F7'],
      ['Eb^7', 'Eo7'], ['Eb^7', 'Eo7'], ['Eb^7', 'Ab^7'], ['Gh7', 'C7b9'],
      ['F-7', 'C7b13'], ['F-7', 'Bb7'], ['Db7#11'], ['C7'],
      ['F-7'], ['Bb7'], ['Eb6'], ['F-7', 'Bb7']])
  })
})

describe('iRealPro parser', function () {
  it('should have the right number of songs', function () {
    expect(songData.songs.length).toEqual(7);
  });

  it('should have the right number of measures', function () {
    expect(testSong.length).toEqual(12);
  });

  it('every chord returned should start with A, B, C, D, E, F, or G', function () {
    expect(testSong.every(chord => {
      return (chord[0] === null || (/^[a-g]/i).test(chord))
    })).toEqual(true);
  });

  it('should fill in double repeats', function () {
    expect(testSong[2]).toEqual(['C'])
    expect(testSong[3]).toEqual(['C#'])
  });

  it('should fill in invisible slash chords', function () {
    expect(testSong[7]).toEqual(['E/D', 'E/C', 'E/B'])
  });

  it('should fill in single repeats', function () {
    expect(testSong[9][0]).toEqual('Ab')
  });

  it('should handle Kcl repeats correctly', function () {
    expect(theBreezeAndI[2][0]).toEqual('Eb6');
    expect(theBreezeAndI[3][0]).toEqual('Eb6');
    expect(theBreezeAndI[5][0]).toEqual('Db-7');
  });

  it('should handle slash chords correctly', function () {
    expect(theBreezeAndI[17][0]).toEqual('F-7/Bb');
  });

  it('should handle add/sus chords correctly', function () {
    expect(allOfMe[2][0]).toEqual('Eadd9');
    expect(allOfMe[4][0]).toEqual('Asus');
    expect(allOfMe[4][1]).toEqual('A7susadd3');
  });

})
