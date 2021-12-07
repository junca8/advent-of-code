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
    const min = Math.min(...crabArray);
    const max = Math.max(...crabArray);
    for (let i = min; i < max; i++) {
        for (let k = 0; k < crabArray.length; k++) {
            let val = Math.abs(i - crabArray[k]);
            if (val % 2 === 0) {
                fuel += ((val / 2) * (val + 1));
            } else {
                fuel += (Math.round(val / 2) * val);
            }
        }

        if (!lowestFuel || fuel < lowestFuel) {
            lowestFuel = fuel;
        }
        fuel = 0;
    }

    console.log('fuel', lowestFuel);
}