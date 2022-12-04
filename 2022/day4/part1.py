data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

sum = 0
for str in data:
    strMiddle = str.index(',')

    firstHalf = str[0: strMiddle]
    firstHalfMiddle = firstHalf.index('-')
    firstHalf1 = int(firstHalf[0: firstHalfMiddle])
    firstHalf2 = int(firstHalf[firstHalfMiddle + 1: len(firstHalf)])

    secondHalf = str[strMiddle + 1: len(str)]
    secondHalfMiddle = secondHalf.index('-')
    secondHalf1 = int(secondHalf[0: secondHalfMiddle])
    secondHalf2 = int(secondHalf[secondHalfMiddle + 1: len(secondHalf)])

    if firstHalf1 >= secondHalf1 and firstHalf2 <= secondHalf2:
        sum += 1
    elif secondHalf1 >= firstHalf1 and secondHalf2 <= firstHalf2:
        sum += 1

print(sum)