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
    let increaseCount = 0;
    for (let i = 0; i < myFileArray.length; i++) {
        let firstVal = parseInt(myFileArray[i]);
        let secondVal = parseInt(myFileArray[i + 1]);
        if (secondVal > firstVal) {
            increaseCount++;
        }
    }
    console.log(increaseCount);
}