const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let obj = {};
let allPaths = new Set();

readInterface.on('line', function(line) {
    const val1 = line.substring(0, line.indexOf('-'));
    const val2 = line.substring(line.indexOf('-') + 1);
    if (obj.hasOwnProperty(val1)) {
        obj[val1].push(val2);
    } else {
        obj[val1] = [val2];
    }

    if (obj.hasOwnProperty(val2)) {
        obj[val2].push(val1);
    } else {
        obj[val2] = [val1];
    }
});

readInterface.on('close', function(line) {
    calculate();
});

function calculate() {
    for (let i = 0; i < 20000000000; i++) {
        let newVal = determineNextPath('start', [], false).toString();
        if (newVal) {
            allPaths.add(newVal);
        }
        if (i % 1000000000 === 0) {
            console.log('billion count', i / 1000000000);
        }
    }
    console.log('count', allPaths.size);
}

function determineNextPath(property, path, twoLowerCase) {
    if (property === 'end') {
        path.push(property);
        return path;
    }

    if (property === 'start' && path.length > 0) {
        return [];
    }

    const lowerCase = property.toLowerCase();
    
    if (property === lowerCase && path.indexOf(property) > -1 && twoLowerCase) {
        return [];
    } else if (property === lowerCase && path.indexOf(property) > -1 && !twoLowerCase) {
        path.push(property);
        return determineNextPath(getRandomProperty(property), path, true);
    } else {
        path.push(property);
        return determineNextPath(getRandomProperty(property), path, twoLowerCase);
    }
}

function getRandomProperty(property) {
    const maxIndex = obj[property].length;
    const randomIndex = Math.floor(Math.random() * maxIndex);
    return obj[property][randomIndex];
}