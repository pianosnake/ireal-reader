# iReal Reader

This is a Node JS module to read music files from [iRealPro](http://irealpro.com/).

The output is a JS object similar to the one shown below. Repeated measures, endings, segnos and codas are all expanded and written out serially in one array.


``` javascript
{
  name: 'Swing Tunes',
  songs:
   [ {
       title: 'All Of Me',
       composer: 'Marks Gerald',
       style: 'Medium Swing',
       key: 'C',
       transpose: null,
       compStyle: '0',
       bpm: 100,
       repeats: 3,
       music: {
          timeSignature: '44',
          raw: '[*AT44C^7XyQKcl LZEadd9XyQKcl LZAsus A7susadd3LZsA, ,lBLZD-7XyQKcl  ][*BE7XyQKcl LZA-7XyQKcl LZD7XyQKcl LZD-7XyQ|G7XyQ][*AC^7XyQKcl LZE7XyQKcl LZA7XyQKcl LZD-7XyQKcl  ][*CF^7XyQ|F-6(F#o7)XyQ|E-7(C^7/G)XyQ|A7XyQ|D-7XyQ|G7XyQ|C6 Ebo7LZD-7 G7 Z',
          measures:
            [
              ['C^7'], ['C^7'], ['Eadd9'], ['Eadd9'],
              ['Asus', 'A7susadd3'], ['A', 'B'], ['D-7'], ['D-7'],
              ['E7'], ['E7'], ['A-7'], ['A-7'],
              ['D7'], ['D7'], ['D-7'], ['G7'],
              ['C^7'], ['C^7'], ['E7'], ['E7'],
              ['A7'], ['A7'], ['D-7'], ['D-7'],
              ['F^7'], ['F-6', 'F#o7'], ['E-7', 'C^7/G'], ['A7'],
              ['D-7'], ['G7'], ['C6', 'Ebo7'], ['D-7', 'G7']]
          }
       }
     ...
   ]
}
```

### Usage

Install the module with `npm install ireal-reader`. In your project read in the HTML or `ireal://...` url output from iRealPro.

The example below shows how to read the music from an HTML file:

``` javascript
const fs = require('fs');
const iRealReader = require('ireal-reader');

fs.readFile("ireal-output-file.html", "utf8", function(err, data) {
    if (err) throw err;
    const playlist = iRealReader(data);
}
```

### Developing
Feel free to fork or submit pull requests. Run tests with `npm test`

To develop and use the project locally, use `npm pack`. This will create a .tgz file that can be used locally by other modules. In your other project do `npm install path/to/ireal-reader-xxx.tgz`

### Acknowledgments

The irealb schema was originally cracked by Stephen Irons' [Accompaniser](https://github.com/ironss/accompaniser).

## License

[MIT License](http://opensource.org/licenses/MIT)
