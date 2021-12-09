const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let array = [];

readInterface.on('line', function(line) {
    const index = line.indexOf('|') + 2;
    array.push(line.slice(index).split(' '));
});

readInterface.on('close', function(line) {
    calculate();
});

function calculate() {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        for (let k = 0; k < array[i].length; k++) {
            let length = array[i][k].length;
            if (length === 2 || length === 4 || length === 3 || length === 7) {
                count++;
            }
        }
    }
    console.log('count', count);
}