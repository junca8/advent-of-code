data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

top3 = [0, 0, 0]
current = 0
for x in data:
  if x == '':
    top3.append(current)
    current = 0
    top3.sort()
    top3.pop(0)
  else:
    current = current + int(x)

max = 0
for y in top3:
    max = max + y

print(max)