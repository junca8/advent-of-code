data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

def checkIfVisibleFromLeft(x, y):
    treeHeight = int(data[y][x])
    i = 0
    isTreeVisible = True
    while i < x:
        currentTreeHeight = int(data[y][i])
        if currentTreeHeight >= treeHeight:
            isTreeVisible = False
            break
        else:
            i += 1

    return isTreeVisible

def checkIfVisibleFromRight(x, y):
    treeHeight = int(data[y][x])
    i = len(data[0]) - 1
    isTreeVisible = True
    while i > x:
        currentTreeHeight = int(data[y][i])
        if currentTreeHeight >= treeHeight:
            isTreeVisible = False
            break
        else:
            i -= 1

    return isTreeVisible

def checkIfVisibleFromTop(x, y):
    treeHeight = int(data[y][x])
    i = 0
    isTreeVisible = True
    while i < y:
        currentTreeHeight = int(data[i][x])
        if currentTreeHeight >= treeHeight:
            isTreeVisible = False
            break
        else:
            i += 1

    return isTreeVisible

def checkIfVisibleFromBottom(x, y):
    treeHeight = int(data[y][x])
    i = len(data) - 1
    isTreeVisible = True
    while i > y:
        currentTreeHeight = int(data[i][x])
        if currentTreeHeight >= treeHeight:
            isTreeVisible = False
            break
        else:
            i -= 1

    return isTreeVisible

totalTrees = (len(data[0]) * 2) + (len(data) * 2) - 4

for i in range(1, len(data) - 1):
    for k in range(1, len(data[i]) - 1):
        x = k
        y = i
        isVisibleFromLeft = checkIfVisibleFromLeft(x, y)
        isVisibleFromRight = checkIfVisibleFromRight(x, y)
        isVisibleFromBottom = checkIfVisibleFromBottom(x, y)
        isVisibleFromTop = checkIfVisibleFromTop(x, y)
        if isVisibleFromLeft or isVisibleFromRight or isVisibleFromBottom or isVisibleFromTop:
            totalTrees += 1

print(totalTrees)
