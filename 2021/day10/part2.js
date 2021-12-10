const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let array = [];
let scoreMap = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
};
let closeMap = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
};
let openMap = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
}

readInterface.on('line', function(line) {
    array.push(line.split(''));
});

readInterface.on('close', function(line) {
    calculate();
});

function calculate() {
    let scores = [];
    for (let i = 0; i < array.length; i++) {
        let openArr = [];
        let total = 0
        for (let k = 0; k < array[i].length; k++) {
            let val = array[i][k];
            if (closeMap[val]) {
                if (openArr[openArr.length - 1] === closeMap[val]) {
                    openArr.splice(openArr.length - 1, 1);
                } else {
                    break;
                }
            } else {
                openArr.push(val);
            }
            if (k === array[i].length - 1 && openArr.length) {
                for (let j = openArr.length - 1; j > -1; j--) {
                    total = (5 * total) + scoreMap[openMap[openArr[j]]];
                }
                scores.push(total);
            }
        }
    }
    scores.sort((a, b) => a - b);
    console.log('score', scores[Math.floor(scores.length / 2)]);
}