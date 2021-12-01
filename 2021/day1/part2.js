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
        let thirdVal = parseInt(myFileArray[i + 2]);
        let firtSum = firstVal + secondVal + thirdVal;

        let fourthVal = parseInt(myFileArray[i + 3]);
        let secondSum = secondVal + thirdVal + fourthVal;
        if (firtSum < secondSum) {
            increaseCount++;
        }
    }
    console.log(increaseCount);
}