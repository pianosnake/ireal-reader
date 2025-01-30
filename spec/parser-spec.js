'use strict';

const fs = require('fs');
const iRealReader = require('../index');

const iRealData = fs.readFileSync("spec/Tester.html", 'utf8');
const songData = new iRealReader(iRealData);
const [testSong, neverBeSame, paperMoon, theBreezeAndI, imagination, forJan, allOfMe, comeFly, daphne, inHerFam, mySong, noComp, masquerade, aTasteOfHoney] = songData.songs;

describe('Song Parser', function () {
  it('should have the right number of songs', function () {
    expect(songData.songs.length).toEqual(14);
  });

  it('every chord returned should start with A, B, C, D, E, F, G or be null', function () {
    expect(testSong.music.measures.every(chord => {
      return (chord[0] === null || (/^[a-g]/i).test(chord))
    })).toEqual(true);
  });

  it('should correctly parse Test Song', () => {
    expect(testSong.title).toEqual('Test')
    expect(testSong.composer).toEqual('Florin')
    expect(testSong.style).toEqual('Medium Swing')
    expect(testSong.key).toEqual('C')
    expect(testSong.bpm).toEqual(140)
    expect(testSong.transpose).toEqual(2)
    expect(testSong.compStyle).toEqual('Latin-Brazil: Bossa Acoustic')
    expect(testSong.repeats).toEqual(3);
    expect(testSong.music.timeSignature).toEqual('34');
    expect(testSong.music.measures).toEqual([
      ['C'], ['C#'], ['C'], ['C#'], ['G'],
      ['A'], ['C', 'D', 'E'], ['E/D', 'E/C', 'E/B'], ['Ab'], ['Ab'],
      [null], ['F'],
      //the repeat
      ['C'], ['C#'], ['C'], ['C#'], ['G'],
      ['A'], ['C', 'D', 'E'], ['E/D', 'E/C', 'E/B'], ['Ab'], ['Ab'],
      [null], ['F']
    ])
  });

  it('should correctly parse No Comp Transpose song', () => {
    expect(noComp.title).toEqual('No comp transpose')
    expect(noComp.style).toEqual('Medium Swing')
    expect(noComp.key).toEqual('C')
    expect(noComp.transpose).toEqual(3)
    expect(noComp.compStyle).toEqual(null)
  });

  it('should correctly parse I\'ll Never Be The Same', () => {
    expect(neverBeSame.title).toEqual('I\'ll Never Be The Same   dfb')
    expect(neverBeSame.composer).toEqual('Khan-Malneck-Signorelli')
    expect(neverBeSame.style).toEqual('Medium Swing')
    expect(neverBeSame.key).toEqual('F')
    expect(neverBeSame.bpm).toEqual(180)
    expect(neverBeSame.compStyle).toEqual('Jazz-Gypsy Jazz')
    expect(neverBeSame.repeats).toEqual(3)
    expect(neverBeSame.music.timeSignature).toEqual(null);
    expect(neverBeSame.music.measures).toEqual([
      ['Db7', 'C7'], ['Db7', 'C7'], ['F'], ['F'],
      ['Db7', 'C7'], ['Db7', 'C7'], ['F'], ['F'],
      ['C-7', 'F7'], ['C-7', 'F7'], ['Bb'], ['Bb'],
      ['G7'], ['G7'], ['G-7'], ['C7'],
      ['Db7', 'C7'], ['Db7', 'C7'], ['F'], ['F'],
      ['C-7', 'F7'], ['C-7', 'F7'], ['Bb'], ['Bb'],
      ['Bb-7'], ['Eb7'], ['F', 'Eb7'], ['D7'],
      ['Db7', 'C7'], ['Db7', 'C7'], ['F', 'Bb'], ['F']])
  });

  it('should correctly parse Paper Moon', () => {
    expect(paperMoon.title).toEqual('It\'s Only a Paper Moon  dfb')
    expect(paperMoon.composer).toEqual('Arlen Harold')
    expect(paperMoon.style).toEqual('Medium Swing')
    expect(paperMoon.key).toEqual('C')
    expect(paperMoon.bpm).toEqual(180)
    expect(paperMoon.compStyle).toEqual('Jazz-Gypsy Jazz')
    expect(paperMoon.repeats).toEqual(3)
    expect(paperMoon.music.timeSignature).toEqual('44');
    expect(paperMoon.music.measures).toEqual([
      ['C', 'C#o7'], ['D-7', 'G7'], ['D-7', 'G7'], ['C'],
      ['C7'], ['F', 'F-'], ['G7'], ['C', 'G7'],
      ['C', 'C#o7'], ['D-7', 'G7'], ['D-7', 'G7'], ['C'],
      ['C7'], ['F', 'F-'], ['G7'], ['C', 'C7'],
      ['F', 'F#o7'], ['C', 'A7'], ['D-7', 'G7'], ['C', 'C7'],
      ['F', 'F#o7'], ['C'], ['Eh7', 'A7'], ['D-7', 'G7'],
      ['C', 'C#o7'], ['D-7', 'G7'], ['D-7', 'G7'], ['C'],
      ['C7'], ['F', 'F-'], ['G7'], ['C', 'G7']])
  });

  it('should correctly parse The Breeze And I', () => {
    expect(theBreezeAndI.title).toEqual('Breeze And I, The 1')
    expect(theBreezeAndI.composer).toEqual('Lecuona Ernesto')
    expect(theBreezeAndI.style).toEqual('Latin')
    expect(theBreezeAndI.key).toEqual('Eb')
    expect(theBreezeAndI.bpm).toEqual(0)
    expect(theBreezeAndI.compStyle).toEqual(null)
    expect(theBreezeAndI.repeats).toEqual(0)
    expect(theBreezeAndI.music.timeSignature).toEqual('44');
    expect(theBreezeAndI.music.measures).toEqual([
      ['Eb6'], ['Eb6'], ['Eb6'], ['Eb6'],
      ['Db-7'], ['Db-7'], ['Eb6'], ['Bb7'],
      ['Eb6'], ['Eb6'], ['Eb6'], ['Eb6'],
      ['Db-7'], ['Db-7'], ['Eb6'], ['Eb6'],
      ['F-7'], ['F-7/Bb'], ['Eb^7'], ['C-7'],
      ['F-7'], ['Bb7'], ['Eb^7'], ['C7b9'],
      ['F-7'], ['F-7/Bb'], ['Eb^7'], ['C-7'],
      ['F-7'], ['Bb7'], ['Eb6'], ['Bb7'],
      ['Eb6'], ['Bb7']])
  });

  it('should correctly parse Imagination', () => {
    expect(imagination.title).toEqual('Imagination')
    expect(imagination.composer).toEqual('Van-Heusen Jimmy')
    expect(imagination.style).toEqual('Ballad')
    expect(imagination.key).toEqual('Eb')
    expect(imagination.bpm).toEqual(0)
    expect(imagination.compStyle).toEqual(null)
    expect(imagination.repeats).toEqual(0)
    expect(imagination.music.timeSignature).toEqual('44');
    expect(imagination.music.measures).toEqual([
      ['Eb^7', 'Eo7'], ['F-7', 'Bb7'], ['Eb^7', 'Ab^7'], ['Gh7', 'C7b9'],
      ['F-7', 'C7b13'], ['F-7', 'Bb7'], ['G7', 'C7'], ['F-7', 'Bb7'],
      ['Eb^7', 'Eo7'], ['F-7', 'Bb7'], ['Eb^7', 'Ab^7'], ['Gh7', 'C7b9'],
      ['F-7', 'C7b13'], ['F-7', 'Bb7'], ['Eb^7'], ['Bb-7', 'Eb7'],
      ['Ab^7', 'F-7'], ['Ah7', 'D7b9'], ['G-7'], ['C7', 'A7b9/C#'],
      ['D-7', 'G-7'], ['C-7', 'F7'], ['D-7', 'G-7'], ['C-7', 'F7'],
      ['Eb^7', 'Eo7'], ['Eb^7', 'Eo7'], ['Eb^7', 'Ab^7'], ['Gh7', 'C7b9'],
      ['F-7', 'C7b13'], ['F-7', 'Bb7'], ['Db7#11'], ['C7'],
      ['F-7'], ['Bb7'], ['Eb6'], ['F-7', 'Bb7']])
  });

  it('should correctly parse For Jan', () => {
    expect(forJan.title).toEqual('For Jan')
    expect(forJan.composer).toEqual('Wheeler Kenny')
    expect(forJan.style).toEqual('Waltz')
    expect(forJan.key).toEqual('A')
    expect(forJan.bpm).toEqual(0)
    expect(forJan.compStyle).toEqual(null)
    expect(forJan.repeats).toEqual(0)
    expect(forJan.music.timeSignature).toEqual('34');
    expect(forJan.music.measures).toEqual([
      ['Bb^7#11'], ['E7alt'], ['A7b9b13'], ['D-9'],
      ['E7b9b13'], ['E7b9b13'], ['A-7'], ['F^7#11'],
      ['Bb^7#11'], ['E7alt'], ['A7b9b13'], ['Ab7#5'],
      ['C9#5/G', 'C9#5/F#'], ['E7b13/G#'], ['A-7'], ['B7#9#5'],
      ['E-11'], ['D-11'], ['C-11'], ['Bb^7#11'],
      ['E7alt'], ['E7alt'], ['A^7'], ['A^7']]);
  });

  it('should correctly parse All Of Me', () => {
    expect(allOfMe.title).toEqual('All Of Me')
    expect(allOfMe.composer).toEqual('Marks Gerald')
    expect(allOfMe.style).toEqual('Medium Swing')
    expect(allOfMe.key).toEqual('C')
    expect(allOfMe.bpm).toEqual(100)
    expect(allOfMe.compStyle).toEqual('Jazz-Medium Swing')
    expect(allOfMe.repeats).toEqual(3)
    expect(allOfMe.music.timeSignature).toEqual('44');
    expect(allOfMe.music.measures).toEqual([
      ['C^7'], ['C^7'], ['Eadd9'], ['Eadd9'],
      ['Asus', 'A7susadd3'], ['A', 'B'], ['D-7'], ['D-7'],
      ['E7'], ['E7'], ['A-7'], ['A-7'],
      ['D7'], ['D7'], ['D-7'], ['G7'],
      ['C^7'], ['C^7'], ['E7'], ['E7'],
      ['A7'], ['A7'], ['D-7'], ['D-7'],
      ['F^7'], ['F-6', 'F#o7'], ['E-7', 'C^7/G'], ['A7'],
      ['D-7'], ['G7'], ['C6', 'Ebo7'], ['D-7', 'G7']]);
  });

  it('should correctly parse Come Fly With Me', () => {
    expect(comeFly.title).toEqual('Come Fly With Me 1')
    expect(comeFly.composer).toEqual('Van-Heusen Jimmy')
    expect(comeFly.style).toEqual('Medium Up Swing')
    expect(comeFly.key).toEqual('C')
    expect(comeFly.bpm).toEqual(309)
    expect(comeFly.compStyle).toEqual(null)
    expect(comeFly.repeats).toEqual(0)
    expect(comeFly.music.timeSignature).toEqual('44');
    expect(comeFly.music.measures).toEqual([
      //first ending
      ['C^7', 'C6'], ['E-7', 'Ebo7'], ['D-7'], ['G7'],
      ['C^7', 'C6'], ['G-7', 'C7'], ['F^7'], ['Bb7'],
      ['C^7', 'C6'], ['F7'], ['E7', 'A7b9'], ['D7', 'G7'],

      //second ending
      ['C^7', 'C6'], ['E-7', 'Ebo7'], ['D-7'], ['G7'],
      ['C^7', 'C6'], ['G-7', 'C7'], ['F^7'], ['Bb7'],
      ['C^7', 'C6'], ['F7', 'G7sus'], ['C6', 'G7sus'], ['C6'],

      //bridge
      ['Ab'], ['Ab+'], ['Db^7'], ['Db6'],
      ['Bb-7'], ['Eb7'], ['Ab6'], ['Bb-7', 'Eb7sus'],
      ['Ab', 'Ab+'], ['Ab6'], ['G^7'], ['E-7'],
      ['A-7'], ['D7'], ['G7', 'G7sus'], ['G7', 'G7b9'],

      //third ending
      ['C^7', 'C6'], ['E-7', 'Ebo7'], ['D-7'], ['G7'],
      ['C^7', 'C6'], ['G-7', 'C7'], ['F^7'], ['Bb7'],
      ['C^7', 'C6'], ['F7'], ['Eh7', 'Bb7'], ['A7b9'],
      ['D7'], ['D-7', 'G7'], ['C6'], ['D-7', 'G7']]);
  });

  it('should correctly parse Daphne', () => {
    expect(daphne.title).toEqual('Daphne  dfb 1')
    expect(daphne.composer).toEqual('Reinhardt Django')
    expect(daphne.style).toEqual('Medium Swing')
    expect(daphne.key).toEqual('D')
    expect(daphne.bpm).toEqual(200)
    expect(daphne.compStyle).toEqual('Jazz-Gypsy Jazz')
    expect(daphne.repeats).toEqual(3)
    expect(daphne.music.timeSignature).toEqual('44');
    expect(daphne.music.measures).toEqual([
      ['D', 'B-7'], ['E-7', 'A7'], ['D', 'B-7'], ['E-7', 'A7'],
      ['D', 'D/C'], ['G/B', 'Bb7'], ['D'], ['D'],
      //first repeat
      ['D', 'B-7'], ['E-7', 'A7'], ['D', 'B-7'], ['E-7', 'A7'],
      ['D', 'D/C'], ['G/B', 'Bb7'], ['D'], ['D'],
      //bridge
      ['Eb', 'C-7'], ['F-7', 'Bb7'], ['Eb', 'C-7'], ['F-7', 'Bb7'],
      ['Eb', 'C-7'], ['F-7', 'Bb7'], ['Eb'], ['A7'],
      //third repeat DC al fine
      ['D', 'B-7'], ['E-7', 'A7'], ['D', 'B-7'], ['E-7', 'A7'],
      ['D', 'D/C'], ['G/B', 'Bb7'], ['D'], ['D']]);
  });

  it('should correctly parse In Her Family', () => {
    expect(inHerFam.title).toEqual('In Her Family 1')
    expect(inHerFam.composer).toEqual('Metheny Pat')
    expect(inHerFam.style).toEqual('Even 8ths')
    expect(inHerFam.key).toEqual('E')
    expect(inHerFam.bpm).toEqual(360)
    expect(inHerFam.compStyle).toEqual(null)
    expect(inHerFam.repeats).toEqual(0)
    expect(inHerFam.music.timeSignature).toEqual('44');
    expect(inHerFam.music.measures).toEqual([
      ['G#-9'], ['D^7/F#'], ['E^9'], ['D#-7'],
      ['C#-7', 'E^9'], ['F#2', 'E^9'], ['C#-7', 'G#-9'], ['F#/A#', 'Aadd9'],
      ['E/G#', 'Bb^7#11/F'], ['E', 'Bb^7#11/D'], ['E', 'Bb^7#11'], ['E'],

      //first repeat
      ['G#-9'], ['D^7/F#'], ['E^9'], ['D#-7'],
      ['C#-7', 'E^9'], ['F#2', 'E^9'], ['C#-7', 'G#-9'], ['F#/A#', 'Aadd9'],
      ['E/G#', 'Bb^7#11/F'], ['E', 'Bb^7#11/D'], ['E', 'Bb^7#11'], ['E'],

      //bridge
      ['C^7'], ['D/C'], ['Bb^7'], ['C/Bb'],
      ['Ab^7'], ['E/D'], ['F#-7'], ['F#-7'],
      ['Eb-9'], ['Bb-11'], ['D-9'], ['A-11'],
      ['C#-9'], ['G#-9'], ['E^7#11'], ['E^7#11'],

      //repeat with coda
      ['G#-9'], ['D^7/F#'], ['E^9'], ['D#-7'],
      ['C#-7', 'E^9'], ['F#2', 'E^9'], ['C#-7', 'G#-9'], ['F#/A#', 'Aadd9'],
      ['E/G#', 'Bb^7#11/F'], ['E', 'Bb^7#11/D'], ['E', 'Bb^7#11'],
      ['E', 'Bb^7#11/F'], ['E'], ['E']

    ]);
  });

  it('should correctly parse My Song', () => {
    expect(mySong.title).toEqual('My Song 1')
    expect(mySong.composer).toEqual('Jarrett Keith')
    expect(mySong.style).toEqual('Even 8ths')
    expect(mySong.key).toEqual('C')
    expect(mySong.bpm).toEqual(0)
    expect(mySong.compStyle).toEqual(null)
    expect(mySong.repeats).toEqual(0)
    expect(mySong.music.timeSignature).toEqual('44');
    expect(mySong.music.measures).toEqual([
      //repeated intro
      ['C'], ['C'], ['Db^7'], ['D-7', 'G7sus'],
      ['C'], ['C'], ['Db^7'], ['D-7', 'G7sus'],

      //A first ending
      ['C'], ['C'], ['D-'], ['D-'],
      ['G7sus'], ['G7'], ['F#h7'], ['F#7b5'],
      ['F^7', 'F/E'], ['D-7', 'D#o'], ['E-7'], ['A-7'],
      ['D-7'], ['C/E'], ['F-7'], ['G7b9'],

      //A second ending
      ['C'], ['C'], ['D-'], ['D-'],
      ['G7sus'], ['G7'], ['F#h7'], ['F#7b5'],
      ['F^7', 'F/E'], ['D-7', 'D#o'], ['E-7'], ['A-7'],
      ['D-7'], ['C/E'], ['F-7'], ['Bb7sus', 'Bb7'],

      ['Eb', 'Eb/D'], ['C-7'], ['D7#9'], ['G7b9'],
      ['Ab^7', 'A-'], ['A-', 'D7b9'], ['G-7'], ['C7b9#11'],
      ['C/Db', 'Db/C'], ['Bb-7', 'Bb-7/Ab'], ['G7b9b13'], ['A-7'],
      ['Bb'], ['F'], ['G7sus'], ['G7'],

      //A wih coda
      ['C'], ['C'], ['D-'], ['D-'],
      ['G7sus'], ['G7'], ['F#h7'], ['F#7b5'],
      ['F^7', 'F/E'], ['D-7', 'D#o'], ['E-7'], ['A-7'],
      ['D-7'], ['C/E'], ['F-7'], ['G7b9'],
      ['C'], ['C'], ['Db^7'], ['D-7', 'G7sus'],
      ['C'], ['C'], ['Db^7'], ['D-7', 'G7sus']
    ]);
  });

  it('should correctly parse This Masquerade', () => {
    // console.log(masquerade.music.raw)
    // print(masquerade.music.measures)
    expect(masquerade.title).toEqual('This Masquerade 1')
    expect(masquerade.composer).toEqual('Russell Leon')
    expect(masquerade.style).toEqual('Rock Pop')
    expect(masquerade.key).toEqual('F-')
    expect(masquerade.bpm).toEqual(0)
    expect(masquerade.compStyle).toEqual(null)
    expect(masquerade.repeats).toEqual(0)
    expect(masquerade.music.timeSignature).toEqual('44');
    expect(masquerade.music.measures).toEqual([
      //intro
      ['F-7'], ['Bb13'], ['F-7'], ['Bb13'],
      ['F-7'], ['Bb13'], ['F-7'], ['Bb13'],

      //part A
      ['F-'], ['F-^7'], ['F-7'], ['Bb13'],
      ['F-'], ['Db7'], ['Gh7'], ['C7#9'],
      ['F-'], ['F-^7'], ['F-7'], ['Bb13'],
      ['Db7'], ['Gh7', 'C7b9'], ['F-'], ['F-', 'E-7', 'A7'],

      //part B
      ['Eb-7'], ['Ab13b9'], ['Db^7'], ['Bb7b13'],
      ['Eb-7'], ['Ab13b9'], ['Db^7'], ['Db^7'],
      ['D-7'], ['G13', 'G7b13'], ['C^7'], ['C^7'],
      ['G-7'], ['G13', 'G7b13'], ['C9sus'], ['Gb7#11'],

      //part A with coda
      ['F-'], ['F-^7'], ['F-7'], ['Bb13'],
      ['F-'], ['Db7'], ['Gh7'], ['C7#9'],
      ['F-'], ['F-^7'], ['F-7'], ['Bb13'],
      ['Db7'], ['Gh7', 'C7b9'],
      ['F-7'], ['Bb13'], ['F-7'], ['Bb13'],
      ['F-7'], ['Bb13'], ['F-7'], ['Bb13']]);
  });

  it('should correctly parse A Taste Of Honey', () => {
    // console.log(aTasteOfHoney.music.raw)
    // print(aTasteOfHoney.music.measures)
    expect(aTasteOfHoney.title).toEqual('A Taste Of Honey')
    expect(aTasteOfHoney.composer).toEqual('Marlow-Scott')
    expect(aTasteOfHoney.key).toEqual('D-')
    expect(aTasteOfHoney.music.timeSignature).toEqual('34');
    expect(aTasteOfHoney.music.measures).toEqual([
      ['D-'], ['D-^7'], ['D-7'], ['G7'],
      ['D-'], ['D-^7'], ['D-7'], ['G7'],
      ['D-'], ['D-'], ['Bb^7'], ['A-7'],
      ['D-'], ['D-'], ['D-7'], ['G7'],
      ['D-7'], ['G7'], ['Bb^7'], ['A-7'],
      ['D-'], ['Eh7', 'A7b9']
    ]);
  });
})
