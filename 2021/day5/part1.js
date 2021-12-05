const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let horizontalMove = [];
let verticalMove = [];
let graphArray = Array.apply(null, Array(1000)).map(_ => Array.apply(null, Array(1000)).map(_ => 0));

readInterface.on('line', function(line) {
    const i = line.indexOf(' ');
    const k = line.lastIndexOf(' ');
    const part1 = line.substring(0, i).split(',').map(val => parseInt(val));
    const part2 = line.substring(k + 1, line.length).split(',').map(val => parseInt(val));
    if (part1[0] === part2[0] && part1[1] > part2[1]) {
        verticalMove.push({x: part1[0], y1: part2[1], y2: part1[1]});
    } else if (part1[0] === part2[0] && part1[1] < part2[1]) {
        verticalMove.push({x: part1[0], y1: part1[1], y2: part2[1]});
    } else if (part1[0] > part2[0] && part1[1] === part2[1]) {
        horizontalMove.push({y: part1[1], x1: part2[0], x2: part1[0]});
    } else if (part1[0] < part2[0] && part1[1] === part2[1]) {
        horizontalMove.push({y: part1[1], x1: part1[0], x2: part2[0]});
    }
});

readInterface.on('close', function(line) {
    calculate();
});

function calculate() {
    for (let i = 0; i < horizontalMove.length; i++) {
        let distance = horizontalMove[i].x2 - horizontalMove[i].x1 + 1;
        for (let k = horizontalMove[i].x1; k < horizontalMove[i].x1 + distance; k++) {
            graphArray[horizontalMove[i].y][k]++;
        }
    }

    for (let j = 0; j < verticalMove.length; j++) {
        let distance2 = verticalMove[j].y2 - verticalMove[j].y1 + 1;
        let x = verticalMove[j].x;
        for (let l = verticalMove[j].y1; l < verticalMove[j].y1 + distance2; l++) {
            graphArray[l][x]++;
        }
    }

    let overlap = 0;

    for (let a = 0; a < graphArray.length; a++) {
        for (let b = 0; b < graphArray[a].length; b++) {
            if (graphArray[a][b] > 1) {
                overlap++;
            }
        }
    }

    console.log('overlap', overlap);
}