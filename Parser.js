let measures = [];
let startRepeat;
let lastChord;
let endings = [];

const rules = [
  { token: 'XyQ', description: 'Empty space' },
  { token: /\*\w/, description: 'Section markers, *A, *B, *C' },
  { token: /<.*?>/, description: 'Comments delimited by carets < ... >' },
  { token: /T\d+/, description: 'time signatures T44, T34' },
  { token: 'x', description: 'Repeat previous measure in current measure', operation: repeatLastMeasure },
  { token: 'Kcl', description: 'Repeat previous measure and create new measure', operation: repeatLastMeasureAndAddNew },
  { token: 'r|XyQ', description: 'Repeat previous two measures', operation: repeatLastTwoMeasures },
  { token: /Y+/, description: 'Vertical spacers' },
  { token: 'n', description: 'No Chord (N.C)', operation: insertNull },
  { token: 'p', description: 'Pause slash' },
  { token: 'U', description: 'Ending measure for player' },
  { token: 'S', description: 'Segno' },
  { token: 'Q', description: 'Coda' },
  { token: '{', description: 'Start repeat marker', operation: () => { startRepeat = measures.length; } },
  { token: '}', description: 'End repeat marker', operation: repeatEverythingToFirstEnding },
  { token: /LZ|\||\[/, description: 'Measure delimiter', operation: createNewMeasure },
  { token: ']', description: 'Double bar end' },
  { token: /N(\d)/, description: 'Volta', operation: rememberEndingLocation },
  { token: 'Z', description: 'End of song' },
  { token: /[A-GW]{1}[\+\-\^\dhob#suadlt]*(\/[A-G][#b]?)?/, description: 'Chord', operation: appendChordToMeasures }
]

//chord regex:
//  letters A-G and W (W is an invisible slash chord)
//  {1} only one of the aforementioned letters
//  followed by zero or more of these: + - ^ h o # b digit
//  followed by an optional group (to catch slash chords)
//    that starts with a slash
//    followed by A-G
//    followed by optional # or b

function insertNull() {
  if (measures.length === 0) measures.push([]);

  measures[measures.length - 1].push(null);
}

function repeatLastMeasure() {
  measures[measures.length - 1] = measures[measures.length - 2];
}
function repeatLastMeasureAndAddNew() {
  measures[measures.length] = measures[measures.length - 1];
}

function repeatLastTwoMeasures() {
  measures[measures.length - 1] = measures[measures.length - 3];
  measures[measures.length] = measures[measures.length - 2];
}

function rememberEndingLocation(match) {
  endings[parseInt(match[1]) - 1] = measures.length;
}

function createNewMeasure() {
  measures.push([]);
}

function repeatEverythingToFirstEnding() {
  endRepeat = measures.length;
  measures.push(...measures.slice(startRepeat, endings[0] - 1));
}

function appendChordToMeasures(match) {
  if (measures.length === 0) measures.push([]);

  let chord = match[0];
  if (chord.startsWith('W') && lastChord) {
    chord = chord.replace('W', lastChord)
  } else {
    lastChord = chord.split('/')[0];
  }
  measures[measures.length - 1].push(chord)
}

function parse(inputString) {
  // console.log('called with', inputString);
  // console.log(measures);

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (typeof rule.token === 'string' && inputString.startsWith(rule.token)) {
      if (rule.operation) rule.operation();
      // console.log('### found', rule.description, rule.token)
      parse(inputString.substring(rule.token.length).trim());
      break;
    } else if (rule.token instanceof RegExp) {
      const match = inputString.match(rule.token);
      if (match && match.index === 0) {
        // console.log('### found', rule.description, match[0])
        if (rule.operation) rule.operation(match);
        parse(inputString.substring(match[0].length).trim());
        break;
      }
    }
    if (i === rules.length - 1 && inputString.length > 1) {
      // no rule worked, so trim off one character and parse again
      // console.log('### end', inputString)
      parse(inputString.substring(1));
    }
  }
}

// let test = '*A{T44Eb^7 Eo7LZF-7 Bb7LZEb^7 Ab^7LZGh7 C7b9LZF-7 C7b13LZF-7 Bb7LZN1G7 C7LZF-7 Bb7 }XyQXyQ LZN2Eb^7XyQ|Bb-7 Eb7 ]*B[Ab^7 F-7LZAh7 D7b9LZG-7XyQ|C7 A7b9/C#LZD-7 G-7LZC-7 F7LZBb7susXyQ|Bb7#5XyQ]*A[Eb^7 Eo7LZF-7 Bb7LZEb^7 Ab^7LZGh7 C7b9LZF-7 C7b13LZF-7 Bb7LZDb7#11XyQ|C7XyQ|F-7XyQ|Bb7XyQ|Eb6XyQ|F-7 Bb7 Z';
module.exports = function (decodedIRealData) {
  measures = [];
  endings = [];
  lastChord = null;
  startRepeat = null;

  parse(decodedIRealData);
  return measures;
}

//todo: volta 3
//todo: segno
//include prefix 1r34LbKcu7 in the rules