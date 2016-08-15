# iReal Reader

This is a Node JS module to read music files from [iRealPro](http://irealpro.com/).


The output is a JS object similar to the following:

``` javascript
{
  name: 'Playlist name',
  songs:
   [ Song {
       title: 'Craigslistlieder',
       composer: 'G. Kahane',
       style: 'Medium Swing',
       key: 'C',
       transpose: null,
       compStyle: '0',
       bpm: 180,
       repeats: 3,
       music: {
          raw: '*AT44C-9 Db9LZ x LZXyQr|XyQLZC-9, ...',
          measures:
            [[ 'C-9', 'Db9'],
             [ 'C-9', 'Db9'],
              ...
            ]
          }
       }
     ...
   ]
}
```

###Usage

Install the module with `npm install ireal-reader`. In your project read in the HTML or `ireal://...` url output from iRealPro.

The example below shows how to read the music from an HTML file:

``` javascript
const fs = require('fs');
const iRealReader = require('ireal-reader');

fs.readFile("ireal-output-file.html", "utf8", function(err, data) {
    if (err) throw err;
    var iRealData = new iRealReader(data);
}
```
###Developing
Feel free to fork or submit pull requests. 

Run tests with `npm test`

To develop and use the project locally, use `npm pack`. This will create a .tgz file that can be used locally by other modules. In your other project do `npm install path/to/ireal-reader-xxx.tgz`