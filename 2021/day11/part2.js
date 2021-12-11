const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let array = [];
let steps = 0;
let currentCount = 0;

readInterface.on('line', function(line) {
    array.push(line.split('').map(val => parseInt(val)));
});

readInterface.on('close', function(line) {
    calculate();
});

function calculate() {
    currentCount = 0;

    for (let i = 0; i < array.length; i++) {
        for (let k = 0; k < array[i].length; k++) {
            if (array[i][k] < 9) {
                array[i][k]++
            } else if (array[i][k] === 9) {
                array[i][k] = "ready";
            }
        }
    }

    for (let j = 0; j < array.length; j++) {
        for (let m = 0; m < array[j].length; m++) {
            if (array[j][m] === "ready") {
                flash(m, j);
                j = -1;
                break;
            }
        }
    }

    for (let a = 0; a < array.length; a++) {
        for (let b = 0; b < array[a].length; b++) {
            if (array[a][b] === "flash") {
                array[a][b] = 0;
            }
        }
    }

    steps++;
    if (currentCount === 100) {
        console.log('step count', steps);
    } else {
        calculate();
    }
}

function flash(x, y) {
    array[y][x] = "flash";
    currentCount++;

    if (array[y - 1] && array[y - 1][x] < 9) {
        array[y - 1][x]++;
    } else if (array[y - 1] && array[y - 1][x] === 9) {
        array[y - 1][x] = "ready";
    }

    if (array[y - 1] && array[y - 1][x + 1] < 9) {
        array[y - 1][x + 1]++;
    } else if (array[y - 1] && array[y - 1][x + 1] === 9) {
        array[y - 1][x + 1] = "ready";
    }

    if (array[y] && array[y][x + 1] < 9) {
        array[y][x + 1]++;
    } else if (array[y] && array[y][x + 1] === 9) {
        array[y][x + 1] = "ready";
    }

    if (array[y + 1] && array[y + 1][x + 1] < 9) {
        array[y + 1][x + 1]++;
    } else if (array[y + 1] && array[y + 1][x + 1] === 9) {
        array[y + 1][x + 1] = "ready";
    }

    if (array[y + 1] && array[y + 1][x] < 9) {
        array[y + 1][x]++;
    } else if (array[y + 1] && array[y + 1][x] === 9) {
        array[y + 1][x] = "ready";
    }

    if (array[y + 1] && array[y + 1][x - 1] < 9) {
        array[y + 1][x - 1]++;
    } else if (array[y + 1] && array[y + 1][x - 1] === 9) {
        array[y + 1][x - 1] = "ready";
    }

    if (array[y] && array[y][x - 1] < 9) {
        array[y][x - 1]++;
    } else if (array[y] && array[y][x - 1] === 9) {
        array[y][x - 1] = "ready";
    }

    if (array[y - 1] && array[y - 1][x - 1] < 9) {
        array[y - 1][x - 1]++;
    } else if (array[y - 1] && array[y - 1][x - 1] === 9) {
        array[y - 1][x - 1] = "ready";
    }
}