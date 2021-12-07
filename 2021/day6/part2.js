const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let finalCount = 0;
let newLines = [];
let totalDays = 256;
let currentDays = totalDays;
let uniqueValues = [];
let originalLines = [];
let finalObj = {};
let loopIndex = 0;

readInterface.on('line', function(line) {
    originalLines = line.split(',').map(val => parseInt(val));
    uniqueValues = Array.from(new Set(originalLines));
});

readInterface.on('close', function(line) {
    fs.writeFileSync('write.txt', '');
    loop();
});

function loop() {
    if (loopIndex < uniqueValues.length) {
        fs.writeFileSync('read.txt', uniqueValues[loopIndex]);
        readFile();
    } else {
        finalCalculation();
    }
}

function readFile() {
    const read = readline.createInterface({
        input: fs.createReadStream('read.txt')
    });

    read.on('line', function(line) {
        let lineArray = line.split(',').map(val => parseInt(val));
        calculate(lineArray);
    });
    
    read.on('close', function(line) {
        if (newLines.length > 0) {
            fs.appendFileSync('write.txt', newLines.join(',') + '\n');
        }
        fs.writeFileSync('read.txt', '');
        newLines = [];
        currentDays--;
        console.log('remaining days', currentDays);
        if (currentDays > 0) {
            copyFileOver();
        } else {
            calculateFinalCount();
        }
    });
}

function calculate(lineArray) {
    let updatedLineArray = lineArray.map(val => {
        if (val === 0) {
            newLines.push(8);
            if (newLines.length > 10000) {
                fs.appendFileSync('write.txt', newLines.join(',') + '\n');
                newLines = [];
            }
            return 6;
        } else {
            return val - 1;
        }
    });
    fs.appendFileSync('write.txt', updatedLineArray.join(',') + '\n');
}

function copyFileOver() {
    const write = readline.createInterface({
        input: fs.createReadStream('write.txt')
    });

    write.on('line', function(line) {
        fs.appendFileSync('read.txt', line + '\n');
    });

    write.on('close', function(line) {
        fs.writeFileSync('write.txt', '');
        readFile();
    });
}

function calculateFinalCount() {
    const final = readline.createInterface({
        input: fs.createReadStream('write.txt')
    });

    final.on('line', function(line) {
        finalCount += line.split(',').length;
    });

    final.on('close', function(line) {
        finalObj[uniqueValues[loopIndex]] = finalCount;
        finalCount = 0;
        currentDays = totalDays;
        fs.writeFileSync('write.txt', '');
        let newLines = [];
        loopIndex++;
        loop();
    });
}

function finalCalculation() {
    let total = 0;
    for (let i = 0; i < originalLines.length; i++) {
        total += finalObj[originalLines[i]];
    }
    console.log('DONE', total);
}