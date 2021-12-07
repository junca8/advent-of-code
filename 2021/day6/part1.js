const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let fileArray = [];
let days = 80;

readInterface.on('line', function(line) {
    fileArray = line.split(',').map(val => parseInt(val));
});

readInterface.on('close', function(line) {
    calculate();
});

function calculate() {
    let num = [];
    fileArray = fileArray.map(val => {
        if (val === 0) {
            num.push(8);
            return 6;
        } else {
            return val - 1;
        }
    });
    fileArray = [...fileArray, ...num];
    days--;
    if (days > 0) {
        calculate();
    } else {
        console.log('count', fileArray.length);
    }
}