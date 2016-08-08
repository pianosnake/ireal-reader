# iReal Reader

This module allows reading music files from iRealPro.

Usage:

Read in the HTML or `ireal://...` url output from iRealPro.

```
const fs = require('fs');
const iRealReader = require('ireal-reader');

fs.readFile("your-file.html", "utf8", function(err, data) {
    if (err) throw err;
    var iRealData = new iRealReader(data);
}
```

The output is a JS object similar to the following:

``` javascript
{
  name: 'Playlist name',
  songs:
   [ Song {
       title: 'Craigslistlieder',
       composer: 'Composer Unknown',
       style: 'Medium Swing',
       key: 'C',
       transpose: null,
       compStyle: '0',
       bpm: null,
       repeats: null ,
       music: {
          raw: '[T34D#XyQ|C*m*,A,F,E,|D7,  C*m*,|BXyQ|  Z ',
          measures: [ 'T34D#XyQ', 'C*m*,A,F,E,', 'D7,  C*m*,', 'BXyQ', '  Z ' ],
          chords:
            [ { name: 'd#',
                value: 3,
                root: 'd#',
                quality: '',
                isMinor: false,
                isDiminished: false,
                isHalfDiminished: false,
                isDominant: false,
                isMajor: true },
              ...
            ]
          }
       }
     ...
   ]
}
```

This version outputs measures as an array of chords. Chords do not yet have a duration parameter defined but if you need it feel free to do a pull request.

Run tests with `npm test`