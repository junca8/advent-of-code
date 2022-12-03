data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

priorities = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
sum = 0
for str in data:
    half = round(len(str) / 2)
    half1 = str[0: half]
    half2 = str[half: len(str)]
    half1Set = set(half1)
    index = 0
    val = ''
    while val == '':
        if half2[index] in half1Set:
            val = half2[index]
        else:
            index += 1

    sum += priorities.index(val) + 1

print(sum)