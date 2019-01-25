'use strict';

const fixtures = require('./fixtures');
const iRealReader = require('../index');

describe('iReal Reader', function(){
  let playlist;

  describe('tiny playlist containing one song', function(){
    beforeEach(function(){
      playlist = new iRealReader(fixtures.playlists.tiny);
    });

    it('should have the right attributes', function(){
      expect(playlist.name).toBeUndefined();
      expect(playlist.songs.length).toEqual(1);
    });
  });

  describe('three song lists', function(){
    beforeEach(function(){
      playlist = new iRealReader(fixtures.playlists.threeSongs);
    });

    it('should have the right attributes', function(){
      expect(playlist.name).toEqual("Small");
      expect(playlist.songs.length).toEqual(3);
     });
  });

  describe('five song lists', function(){
    beforeEach(function(){
      playlist = new iRealReader(fixtures.playlists.fiveSongs);
    });

    it('should have the right attributes', function(){
      expect(playlist.name).toEqual("Small");
      expect(playlist.songs.length).toEqual(6);
    });
  });

  describe('two song lists inside HTML', function(){
    beforeEach(function(){
      playlist = new iRealReader(fixtures.playlists.twoSongsInHTML);
    });

    it('should have the right attributes', function(){
      expect(playlist.name).toEqual("Small");
      expect(playlist.songs.length).toEqual(2);
    });
  });


  describe('really long song lists', function(){
    beforeEach(function(){
      playlist = new iRealReader(fixtures.playlists.django);
    });

    it('should have the right attributes', function(){
      expect(playlist.name).toEqual("Django Fakebook 2008 dfb");
      expect(playlist.songs.length).toEqual(205);
    });
  });

  describe('chord detection', function(){
    beforeEach(function(){
      playlist = new iRealReader(fixtures.playlists.troublingSongs)
    });

    it('every chord returned should start with A, B, C, D, E, F, or G', function(){
      let allMeasures = [];
      playlist.songs.forEach(s => allMeasures.push(s.music.measures));

      let allChords = [].concat.apply(allMeasures);
      expect(allChords.every(chord => (/^[a-g]/i).test(chord))).toEqual(true);
     });
  });

});
