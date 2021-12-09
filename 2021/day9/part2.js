const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let array = [];

readInterface.on('line', function(line) {
    array.push(line.split('').map(val => parseInt(val)));
});

readInterface.on('close', function(line) {
    calculate();
});

function calculate() {
    let basinSizes = [];
    for (let i = 0; i < array.length; i++) {
        for (let k = 0; k < array[i].length; k++) {
            let val = array[i][k];
            let left = (array[i] && array[i][k - 1] >= 0) ? array[i][k - 1] : 10;
            let right = (array[i] && array[i][k + 1] >= 0) ? array[i][k + 1] : 10;
            let top = (array[i - 1] && array[i - 1][k] >= 0) ? array[i - 1][k] : 10;
            let bottom = (array[i + 1] && array[i + 1][k] >= 0) ? array[i + 1][k] : 10;
            if (val < left && val < right && val < top && val < bottom) {
                let basinSize = determineBasinSize({x: k, y: i}, [{x: k, y: i}]);
                basinSizes.push(basinSize);
            }
        }
    }
    basinSizes.sort((a, b) => a - b);
    const length = basinSizes.length;
    console.log('count', (basinSizes[length - 1] * basinSizes[length - 2] * basinSizes[length - 3]));
}

function determineBasinSize(point, visitedPoints) {
    let {x, y} = point;
    let val = array[y][x];

    let left = (array[y] && array[y][x - 1] >= 0) ? array[y][x - 1] : 0;
    let right = (array[y] && array[y][x + 1] >= 0) ? array[y][x + 1] : 0;
    let top = (array[y - 1] && array[y - 1][x] >= 0) ? array[y - 1][x] : 0;
    let bottom = (array[y + 1] && array[y + 1][x] >= 0) ? array[y + 1][x] : 0;

    if (left !== 9 && left > val) {
        let leftPoint = {x: x - 1, y};
        if (!visitedPoints.find(visitedPoint => visitedPoint.x === leftPoint.x && visitedPoint.y === leftPoint.y)) {
            return determineBasinSize(leftPoint, [...visitedPoints, leftPoint]);
        }
    }

    if (right !== 9 && right > val) {
        let rightPoint = {x: x + 1, y};
        if (!visitedPoints.find(visitedPoint => visitedPoint.x === rightPoint.x && visitedPoint.y === rightPoint.y)) {
            return determineBasinSize(rightPoint, [...visitedPoints, rightPoint]);
        }
    }

    if (top !== 9 && top > val) {
        let topPoint = {x, y: y - 1};
        if (!visitedPoints.find(visitedPoint => visitedPoint.x === topPoint.x && visitedPoint.y === topPoint.y)) {
            return determineBasinSize(topPoint, [...visitedPoints, topPoint]);
        }
    }

    if (bottom !== 9 && bottom > val) {
        let bottomPoint = {x, y: y + 1};
        if (!visitedPoints.find(visitedPoint => visitedPoint.x === bottomPoint.x && visitedPoint.y === bottomPoint.y)) {
            return determineBasinSize(bottomPoint, [...visitedPoints, bottomPoint]);
        }
    }

    let currentIndex = visitedPoints.findIndex(visitedPoint => visitedPoint.x === x && visitedPoint.y === y);
    if (currentIndex === 0) {
        return visitedPoints.length;
    } else {
        return determineBasinSize(visitedPoints[currentIndex - 1], visitedPoints);
    }
}