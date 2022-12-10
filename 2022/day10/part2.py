data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

x = 1
cycle = 0
arr = []
currentLine = ''
for line in data:
    lineSplit = line.split()
    if lineSplit[0] == 'noop':
        if cycle >= x - 1 and cycle <= x + 1:
            currentLine += '#'
        else:
            currentLine += '.'
        cycle += 1
        if len(currentLine) == 40:
            arr.append(currentLine)
            currentLine = ''
            cycle = 0
    else:
        if cycle >= x - 1 and cycle <= x + 1:
            currentLine += '#'
        else:
            currentLine += '.'
        cycle += 1
        if len(currentLine) == 40:
            arr.append(currentLine)
            currentLine = ''
            cycle = 0
        if cycle >= x - 1 and cycle <= x + 1:
            currentLine += '#'
        else:
            currentLine += '.'
        cycle += 1
        x += int(lineSplit[1])
        if len(currentLine) == 40:
            arr.append(currentLine)
            currentLine = ''
            cycle = 0

print(arr)