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
    let gammaRate = '';
    for (let i = 0; i < myFileArray[0].length; i++) {
        let bitOne = 0;
        let bitZero = 0;
        for (let k = 0; k < myFileArray.length; k++) {
            if (parseInt(myFileArray[k].split('')[i]) === 1) {
                bitOne++;
            } else {
                bitZero++;
            }
        }
        if (bitOne > bitZero) {
            gammaRate += '1';
        } else {
            gammaRate += '0';
        }
    }
    let epsilon = gammaRate.split('').map(val => val === '1' ? '0' : '1').join('');
    const firstVal = parseInt(gammaRate, 2);
    const secondVal = parseInt(epsilon, 2);
    console.log(firstVal * secondVal);
}