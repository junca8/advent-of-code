const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let array = [];
let scoreMap = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};
let closeMap = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
};

readInterface.on('line', function(line) {
    array.push(line.split(''));
});

readInterface.on('close', function(line) {
    calculate();
});

function calculate() {
    let score = 0;
    for (let i = 0; i < array.length; i++) {
        let openArr = [];
        for (let k = 0; k < array[i].length; k++) {
            let val = array[i][k];
            if (closeMap[val]) {
                if (openArr[openArr.length - 1] === closeMap[val]) {
                    openArr.splice(openArr.length - 1, 1);
                } else {
                    score += scoreMap[val];
                    break;
                }
            } else {
                openArr.push(val);
            }
        }
    }
    console.log('score', score);
}