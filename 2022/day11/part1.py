import math

data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

monkeyArr = []
countArr = []

class Monkey:
    def __init__(self, items, operationString, testVal, trueIndex, falseIndex):
        self.items = items
        self.operationString = operationString
        self.testVal = testVal
        self.trueIndex = trueIndex
        self.falseIndex = falseIndex

    def addItem(self, item):
        self.items.append(item)

    def removeItems(self):
        self.items = []
    
    def transformItem(self, item):
        operationSplit = self.operationString.split()
        operationValue = 0
        if operationSplit[-1] == 'old':
            operationValue = item
        else:
            operationValue = int(operationSplit[-1])
        new = 0
        if operationSplit[-2] == '+':
            new = item + operationValue
        elif operationSplit[-2] == '-':
            new = item - operationValue
        elif operationSplit[-2] == '*':
            new = item * operationValue
        elif operationSplit[-2] == '/':
            new = item / operationValue
        
        return math.floor(new / 3)
    
    def checkItem(self, item):
        if math.remainder(item, self.testVal) == 0:
            return self.trueIndex
        else:
            return self.falseIndex

for i in range(0, len(data), 7):
    itemsStartIndex = data[i + 1].index(':') + 2
    itemStrings = data[i + 1][itemsStartIndex:].split(', ')
    items = [int(i) for i in itemStrings]
    operationString = data[i + 2]
    testVal = int(data[i + 3].split()[-1])
    trueIndex = int(data[i + 4].split()[-1])
    falseIndex = int(data[i + 5].split()[-1])
    monkey = Monkey(items, operationString, testVal, trueIndex, falseIndex)
    monkeyArr.append(monkey)
    countArr.append(0)

for _ in range(0, 20):
    for k in range(0, len(monkeyArr)):
        monkey = monkeyArr[k]
        for item in monkey.items:
            newItem = monkey.transformItem(item)
            throwIndex = monkey.checkItem(newItem)
            monkeyArr[throwIndex].addItem(newItem)
            countArr[k] += 1
        monkey.removeItems()

countArr.sort()

print(countArr[-1] * countArr[-2])