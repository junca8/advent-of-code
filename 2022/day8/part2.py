data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

def countTreesToLeft(x, y):
    treeHeight = int(data[y][x])
    i = x - 1
    count = 0
    while i >= 0:
        currentTreeHeight = int(data[y][i])
        if currentTreeHeight >= treeHeight:
            count += 1
            break
        else:
            i -= 1
            count += 1

    return count

def countTreesToRight(x, y):
    treeHeight = int(data[y][x])
    i = x + 1
    count = 0
    while i < len(data[0]):
        currentTreeHeight = int(data[y][i])
        if currentTreeHeight >= treeHeight:
            count += 1
            break
        else:
            i += 1
            count += 1

    return count

def countTreesToTop(x, y):
    treeHeight = int(data[y][x])
    i = y - 1
    count = 0
    while i >= 0:
        currentTreeHeight = int(data[i][x])
        if currentTreeHeight >= treeHeight:
            count += 1
            break
        else:
            count += 1
            i -= 1

    return count

def countTreesToBottom(x, y):
    treeHeight = int(data[y][x])
    i = y + 1
    count = 0
    while i < len(data):
        currentTreeHeight = int(data[i][x])
        if currentTreeHeight >= treeHeight:
            count += 1
            break
        else:
            count += 1
            i += 1

    return count

numbersArray = []

for i in range(1, len(data) - 1):
    for k in range(1, len(data[i]) - 1):
        x = k
        y = i
        countToLeft = countTreesToLeft(x, y)
        countToRight = countTreesToRight(x, y)
        countToBottom = countTreesToBottom(x, y)
        countToTop = countTreesToTop(x, y)
        sum = countToLeft * countToRight * countToBottom * countToTop
        numbersArray.append(sum)

numbersArray.sort()

print(numbersArray[-1])
