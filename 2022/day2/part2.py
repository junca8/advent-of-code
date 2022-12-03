data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

sum = 0
for str in data:
    x = str[0]
    y = str[2]
    if x == 'A' and y == 'X':
        sum += 3
    elif x == 'A' and y == 'Y':
        sum += 4
    elif x == 'A' and y == 'Z':
        sum += 8
    elif x == 'B' and y == 'X':
        sum += 1
    elif x == 'B' and y == 'Y':
        sum += 5
    elif x == 'B' and y == 'Z':
        sum += 9
    elif x == 'C' and y == 'X':
        sum += 2
    elif x == 'C' and y == 'Y':
        sum += 6
    elif x == 'C' and y == 'Z':
        sum += 7

print(sum)