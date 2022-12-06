data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

letterArr = []
index = 0
for i in range(0, len(data[0])):
    letterArr.append(data[0][i])
    index += 1
    if len(letterArr) < 4:
        continue
    elif len(set(letterArr)) == 4:
        break
    else:
        letterArr.pop(0)

print(index)