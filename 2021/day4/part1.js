const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let bingoSequences = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24]
];
let bingoNumbers = [];
let myFileArray = [];
let bingoCardArray = [];
let drawnNumber;

readInterface.on('line', function(line) {
    if (line.split(',').length > 1) {
        bingoNumbers = line.split(',').map(val => parseInt(val));
    } else if (line.split(' ').length > 1) {
        const bingoCards = line.split(' ').filter(val => val).map(num => ({value: parseInt(num), selected: false}));
        bingoCardArray.push(...bingoCards);
    } else if (bingoCardArray.length > 1) {
        myFileArray.push(bingoCardArray);
        bingoCardArray = [];
    }
});

readInterface.on('close', function(line) {
    myFileArray.push(bingoCardArray);
    calculate();
});

function calculate() {
    drawnNumber = bingoNumbers.splice(0, 1)[0];
    myFileArray = myFileArray.map(file => {
        return file.map(number => {
            if (number.value === drawnNumber) {
                return {value: number.value, selected: true};
            } else {
                return number;
            }
        })
    });
    calculateBingo();
}

function calculateBingo() {
    myFileArray.forEach((file, i) => {
        bingoSequences.forEach(sequence => {
            let data1 = file[sequence[0]].selected;
            let data2 = file[sequence[1]].selected;
            let data3 = file[sequence[2]].selected;
            let data4 = file[sequence[3]].selected;
            let data5 = file[sequence[4]].selected;

            if (data1 && data2 && data3 && data4 && data5) {
                calculateFinal(i);
                throw "DONE";
            }
        });
    });
    calculate();
}

function calculateFinal(i) {
    const sum = myFileArray[i].reduce((acc, curr) => {
        if (curr.selected) {
            return acc;
        } else {
            return acc + curr.value;
        }
    }, 0);
    console.log('FINAL', sum * drawnNumber);
}