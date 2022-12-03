data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

sum = 0
for str in data:
    x = str[0]
    y = str[2]
    if x == 'A' and y == 'X':
        sum += 4
    elif x == 'A' and y == 'Y':
        sum += 8
    elif x == 'A' and y == 'Z':
        sum += 3
    elif x == 'B' and y == 'X':
        sum += 1
    elif x == 'B' and y == 'Y':
        sum += 5
    elif x == 'B' and y == 'Z':
        sum += 9
    elif x == 'C' and y == 'X':
        sum += 7
    elif x == 'C' and y == 'Y':
        sum += 2
    elif x == 'C' and y == 'Z':
        sum += 6

print(sum)
