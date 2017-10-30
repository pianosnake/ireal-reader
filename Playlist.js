'use strict';

const Song = require('./Song');
const regex = /.*?irealb:\/\/([^"]*)/;

class Playlist {
  constructor(data){
    const percentEncoded = regex.exec(data);
    const percentDecoded = decodeURIComponent(percentEncoded[1]);
    const parts = percentDecoded.split("===");  //songs are separated by ===
    if(parts.length > 1) this.name = parts.pop();  //playlist name
    this.songs = parts.map(x => new Song(x));
  }
}

module.exports = Playlist;