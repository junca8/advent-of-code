const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let array = [];
let numberMap = {
    '0': ['a', 'b', 'c', 'e', 'f', 'g'],
    '1': ['c', 'f'],
    '2': ['a', 'c', 'd', 'e', 'g'],
    '3': ['a', 'c', 'd', 'f', 'g'],
    '4': ['b', 'c', 'd', 'f'],
    '5': ['a', 'b', 'd', 'f', 'g'],
    '6': ['a', 'b', 'd', 'e', 'f', 'g'],
    '7': ['a', 'c', 'f'],
    '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    '9': ['a', 'b', 'c', 'd', 'f', 'g']
};
let letterMap = {
    'a': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    'b': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    'c': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    'd': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    'e': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    'f': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    'g': ['a', 'b', 'c', 'd', 'e', 'f', 'g']
};

readInterface.on('line', function(line) {
    const index = line.indexOf('|');
    const input = line.slice(0, index - 1).split(' ').sort((a, b) => a.length - b.length);
    const output = line.slice(index + 2).split(' ');
    array.push({input, output});
});

readInterface.on('close', function(line) {
    calculate();
});

function calculate() {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        let tempMap = {...letterMap};

        // find 1
        let oneValues = array[i].input[0];
        tempMap['c'] = tempMap[oneValues[0]].filter(val => oneValues.includes(val));
        tempMap['f'] = tempMap[oneValues[1]].filter(val => oneValues.includes(val));

        // find 7
        let sevenValues = array[i].input[1];
        let aVal = sevenValues.split('').filter(val => !tempMap['c'].includes(val));

        // SOLVE FOR A
        tempMap['a'] = aVal;

        // find 4
        let fourValues = array[i].input[2];
        tempMap['b'] = fourValues.split('').filter(val => !tempMap['c'].includes(val));
        tempMap['d'] = fourValues.split('').filter(val => !tempMap['c'].includes(val));

        // find 5
        let fiveValues = array[i].input.find(val => {
            let a = val.indexOf(tempMap['a'][0]);
            let bOrD = val.indexOf(tempMap['b'][0]);
            let dOrB = val.indexOf(tempMap['b'][1]);
            let f = val.indexOf(tempMap['f'][0]);
            let otherF = val.indexOf(tempMap['f'][1]);
            if (a > -1 && bOrD > -1 && dOrB > -1 && (f > -1 || otherF > -1)) {
                return true;
            } else {
                return false;
            }
        });

        // SOLVE FOR G
        tempMap['g'] = fiveValues.split('').filter(val => {
            if (sevenValues.indexOf(val) === -1 && fourValues.indexOf(val) === -1) {
                return true;
            } else {
                return false;
            }
        });

        // SOLVE FOR C
        tempMap['c'] = tempMap['c'].filter(val => {
            if (fiveValues.indexOf(val) === -1) {
                return true;
            } else {
                return false;
            }
        });

        // SOLVE FOR F
        tempMap['f'] = tempMap['f'].filter(val => {
            if (tempMap['c'].includes(val)) {
                return false;
            } else {
                return true;
            }
        });

        // find 3
        let threeValues = array[i].input.find(val => {
            let a = val.indexOf(tempMap['a'][0]);
            let g = val.indexOf(tempMap['g'][0]);
            let c = val.indexOf(tempMap['c'][0]);
            let f = val.indexOf(tempMap['f'][0]);
            if (a > -1 && g > -1 && c > -1 && f > -1) {
                return true;
            } else {
                return false;
            }
        });

        // SOLVE FOR D
        tempMap['d'] = threeValues.split('').filter(val => {
            if (sevenValues.indexOf(val) === -1 && !tempMap['g'].includes(val)) {
                return true;
            } else {
                return false;
            }
        });

        // SOLVE FOR B
        tempMap['b'] = tempMap['b'].filter(val => {
            if (tempMap['d'].includes(val)) {
                return false;
            } else {
                return true;
            }
        });

        // SOLVE FOR E
        tempMap['e'] = tempMap['e'].filter(val => {
            let notE = [tempMap['a'][0], tempMap['b'][0], tempMap['c'][0], tempMap['d'][0], tempMap['f'][0], tempMap['g'][0]];
            if (notE.includes(val)) {
                return false;
            } else {
                return true;
            }
        });
        
        let tempNumber = '';
        array[i].output.forEach(val => {
            let originalVals = val.split('').map(char => {
                return Object.keys(tempMap).find(t => tempMap[t].includes(char));
            });
            Object.keys(numberMap).find(key => {
                let everyVal = originalVals.every(numVal => numberMap[key].includes(numVal));
                if (originalVals.length === numberMap[key].length && everyVal) {
                    tempNumber += key;
                    return true;
                }
                return false;
            });
        });
        count += parseInt(tempNumber);
    }
    console.log('final count', count);
}