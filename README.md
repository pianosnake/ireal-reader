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

#### Command line

Assuming you have Node.js installed and available on the command line. Download the repo, change into the directory, and do `node index.js path/to/your/ireal/HTML.file`. The output will be JSON. 
You can pipe the output to a JSON file like so: `node index.js path/to/your/ireal/HTML.file > output.json`

#### As a Node module

Install the module with `npm install ireal-reader`.  To save to your projects `package.json`, use `npm install ireal-reader --save`.

Then, in your project, read in the HTML or `ireal://...` url output from iRealPro.

The example below shows how to read the music from an HTML file using plain JavaScript:

``` javascript
const fs = require('fs');
const iRealReader = require('ireal-reader');

fs.readFile("ireal-output-file.html", "utf8", function(err, data) {
    if (err) throw err;
    const playlist = iRealReader(data);
}
```

#### TypeScript

The example below shows how to read the music from an HTML file using TypeScript.

First, in your project, `npm install ireal-reader-1.3.0.tgz --save`.  Also, for example, if you are using Angular2, you 
might need a `irealreader.d.ts` file containing the text `declare module 'ireal-reader';` in  your `app` folder.

Then, load this library in your TypeScript class like so:

    import * as iRealReader from 'ireal-reader';
	
Then, call it:

    const iRealHtml: string = '<HTML ...';
    const iRealJson = iRealReader(iRealHtml);


### Developing
Feel free to fork or submit pull requests. Run tests with `npm test`

To develop and use the project locally, use `npm pack`. This will create a .tgz file that can be used locally by other modules. In your other project do `npm install path/to/ireal-reader-xxx.tgz`

The file Tester.html is used in the tests. It can also be opened in iRealPro to make sure it works there.

### Acknowledgments

The irealb schema was originally cracked by Stephen Irons' [Accompaniser](https://github.com/ironss/accompaniser).

## License

[MIT License](http://opensource.org/licenses/MIT)
