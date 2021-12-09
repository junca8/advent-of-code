const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let array = [];

readInterface.on('line', function(line) {
    array.push(line.split('').map(val => parseInt(val)));
});

readInterface.on('close', function(line) {
    calculate();
});

function calculate() {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        for (let k = 0; k < array[i].length; k++) {
            let val = array[i][k];
            let left = (array[i] && array[i][k - 1] >= 0) ? array[i][k - 1] : 10;
            let right = (array[i] && array[i][k + 1] >= 0) ? array[i][k + 1] : 10;
            let top = (array[i - 1] && array[i - 1][k] >= 0) ? array[i - 1][k] : 10;
            let bottom = (array[i + 1] && array[i + 1][k] >= 0) ? array[i + 1][k] : 10;
            if (val < left && val < right && val < top && val < bottom) {
                count += (val + 1);
            }
        }
    }
    console.log('count', count);
}