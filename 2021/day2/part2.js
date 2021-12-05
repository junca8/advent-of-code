const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let myFileArray = [];

readInterface.on('line', function(line) {
    myFileArray.push(line);
});

readInterface.on('close', function(line) {
    calculate();
});

function calculate() {
    let depth = 0;
    let horizontal = 0;
    let aim = 0;
    for (let i = 0; i < myFileArray.length; i++) {
        let positionArray = myFileArray[i].split(' ');
        if (positionArray[0] === 'forward') {
            horizontal += parseInt(positionArray[1]);
            depth += (parseInt(positionArray[1]) * aim);
        } else if (positionArray[0] === 'up') {
            aim -= parseInt(positionArray[1]);
        } else if (positionArray[0] === 'down') {
            aim += parseInt(positionArray [1]);
        }
    }
    console.log(depth * horizontal);
}