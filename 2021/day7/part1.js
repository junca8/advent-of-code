const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let crabArray = [];

readInterface.on('line', function(line) {
    crabArray = line.split(',').map(val => parseInt(val));
});

readInterface.on('close', function(line) {
    calculate();
});

function calculate() {
    let fuel = 0;
    let lowestFuel = 0;
    for (let i = 0; i < crabArray.length; i++) {
        for (let k = 0; k < crabArray.length; k++) {
            fuel += Math.abs(crabArray[i] - crabArray[k]);
        }

        if (!lowestFuel || fuel < lowestFuel) {
            lowestFuel = fuel;
        }
        fuel = 0;
    }

    console.log('fuel', lowestFuel);
}