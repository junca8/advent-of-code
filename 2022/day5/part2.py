data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

boxStacks = [[], [], [], [], [], [], [], [], []]

for i in range(0, 8):
    index = 0
    boxesStr = data[i].split(' ')
    emptySpaceCount = 0
    for val in boxesStr:
        if val != '' and val[0] == '[':
            boxStacks[index].insert(0, val[1])
            index += 1
        elif val == '' and emptySpaceCount == 3:
            emptySpaceCount = 0
            index += 1
        else:
            emptySpaceCount += 1

def moveBoxes(num, start, end):
    arr = []
    for i in range(0, num):
        box = boxStacks[start].pop()
        arr.insert(0, box)
    
    for val in arr:
        boxStacks[end].append(val)

for i in range(10, len(data)):
    str = data[i]
    fIndex = str.index('f')
    tIndex = str.index('t')
    num = int(str[5: fIndex - 1])
    start = int(str[fIndex + 5: tIndex - 1]) - 1
    end = int(str[tIndex + 3]) - 1
    moveBoxes(num, start, end)

finalStr = ''
for arr in boxStacks:
    finalStr += arr.pop()

print(finalStr)