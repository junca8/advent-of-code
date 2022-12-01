data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

max = 0
current = 0
for x in data:
  if x == '':
    if current > max:
        max = current
        current = 0
    else:
        current = 0
  else:
    current = current + int(x)

print(max)
