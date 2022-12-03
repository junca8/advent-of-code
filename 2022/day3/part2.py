data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

priorities = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
sum = 0
for i in range(0, len(data), 3):
    group1Set = set(data[i])
    group2Set = set(data[i + 1])
    index = 0
    val = ''
    while val == '':
        tempVal = data[i + 2][index]
        if tempVal in group1Set and tempVal in group2Set:
            val = tempVal
        else:
            index += 1

    sum += priorities.index(val) + 1

print(sum)