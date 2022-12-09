data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

visitedCoordinatesSet = set()
xCoordinateH = 0
yCoordinateH = 0
xCoordinateT = 0
yCoordinateT = 0

for line in data:
    lineSplit = line.split()
    if lineSplit[0] == 'L':
        for i in range(0, int(lineSplit[1])):
            xCoordinateH -= 1
            if abs(xCoordinateH - xCoordinateT) > 1:
                xCoordinateT = xCoordinateH + 1
                yCoordinateT = yCoordinateH
            visitedCoordinatesSet.add((str(xCoordinateT) + ',' + str(yCoordinateT)))
    elif lineSplit[0] == 'R':
        for i in range(0, int(lineSplit[1])):
            xCoordinateH += 1
            if abs(xCoordinateH - xCoordinateT) > 1:
                xCoordinateT = xCoordinateH - 1
                yCoordinateT = yCoordinateH
            visitedCoordinatesSet.add((str(xCoordinateT) + ',' + str(yCoordinateT)))
    elif lineSplit[0] == 'U':
        for i in range(0, int(lineSplit[1])):
            yCoordinateH += 1
            if abs(yCoordinateH - yCoordinateT) > 1:
                yCoordinateT = yCoordinateH - 1
                xCoordinateT = xCoordinateH
            visitedCoordinatesSet.add((str(xCoordinateT) + ',' + str(yCoordinateT)))
    elif lineSplit[0] == 'D':
        for i in range(0, int(lineSplit[1])):
            yCoordinateH -= 1
            if abs(yCoordinateH - yCoordinateT) > 1:
                yCoordinateT = yCoordinateH + 1
                xCoordinateT = xCoordinateH
            visitedCoordinatesSet.add((str(xCoordinateT) + ',' + str(yCoordinateT)))
    
print(len(visitedCoordinatesSet))
