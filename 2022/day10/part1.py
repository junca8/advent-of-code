data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

sum = 0
x = 1
cycle = 0

for line in data:
    lineSplit = line.split()
    if lineSplit[0] == 'noop':
        cycle += 1
        if cycle == 20 or cycle == 60 or cycle == 100 or cycle == 140 or cycle == 180 or cycle == 220:
            sum += (cycle * x)
    else:
        cycle += 1
        if cycle == 20 or cycle == 60 or cycle == 100 or cycle == 140 or cycle == 180 or cycle == 220:
            sum += (cycle * x)
        cycle += 1
        if cycle == 20 or cycle == 60 or cycle == 100 or cycle == 140 or cycle == 180 or cycle == 220:
            sum += (cycle * x)
        x += int(lineSplit[1])

print(sum)