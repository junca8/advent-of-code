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
    let oxygenRate = '';
    for (let i = 0; i < myFileArray[0].length; i++) {
        let bitOne = 0;
        let bitZero = 0;
        let filteredArr = myFileArray.filter(val => val.substring(0, i) === oxygenRate);
        for (let k = 0; k < filteredArr.length; k++) {
            if (parseInt(filteredArr[k].split('')[i]) === 1) {
                bitOne++;
            } else {
                bitZero++;
            }
        }
        if (bitOne > bitZero || bitOne === bitZero) {
            oxygenRate += '1';
        } else {
            oxygenRate += '0';
        }
    }

    let co2Rate = '';
    for (let i = 0; i < myFileArray[0].length; i++) {
        let bitOne = 0;
        let bitZero = 0;
        let filteredArr = myFileArray.filter(val => val.substring(0, i) === co2Rate);
        for (let k = 0; k < filteredArr.length; k++) {
            if (parseInt(filteredArr[k].split('')[i]) === 1) {
                bitOne++;
            } else {
                bitZero++;
            }
        }
        if (filteredArr.length > 1) {
            if (bitZero > bitOne) {
                co2Rate += '1';
            } else {
                co2Rate += '0';
            }
        } else {
            co2Rate += filteredArr[0][i];
        }
    }

    const firstVal = parseInt(oxygenRate, 2);
    const secondVal = parseInt(co2Rate, 2);
    console.log(firstVal * secondVal);
}