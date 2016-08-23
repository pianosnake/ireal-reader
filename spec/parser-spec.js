'use strict';

const fs = require('fs');
const iRealReader = require('../index');

fs.readFile("spec/Tester.html", "utf8", function(err, data){
  if(err) console.log(err);
  var p = new iRealReader(data);
//  console.log('tester song: ', p.songs[0].music.raw);
  var measures = p.songs[0].music.measures;

  describe('iRealPro parser', function(){

    it('should have the right number of measures', function(){
      expect(measures.length).toEqual(11);
    });

    it('every chord returned should start with A, B, C, D, E, F, or G', function(){
      expect(measures.every(chord => (/^[a-g]/i).test(chord))).toEqual(true);
    });

    it('should fill in double repeats', function(){
      expect(measures[2]).toEqual(['C'])
      expect(measures[3]).toEqual(['C#'])
    });

    it('should fill in invisible slash chords', function(){
      expect(measures[7]).toEqual(['E/D', 'E/C', 'E/B'])
    });

    it('should fill in single repeats', function(){
      expect(measures[9]).toEqual(['Ab'])
    });
  });


});
