data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

visitedCoordinatesSet = set()
arr = [{"x": 0, "y": 0}, {"x": 0, "y": 0}, {"x": 0, "y": 0}, {"x": 0, "y": 0}, {"x": 0, "y": 0}, {"x": 0, "y": 0}, {"x": 0, "y": 0}, {"x": 0, "y": 0}, {"x": 0, "y": 0}, {"x": 0, "y": 0}]

def moveTails(arr, visitedCoordinatesSet):
    for k in range(1, len(arr)):
        if abs(arr[k - 1]["x"] - arr[k]["x"]) > 1 and arr[k - 1]["x"] > arr[k]["x"]:
            arr[k]["x"] = arr[k - 1]["x"] - 1
            if arr[k - 1]["y"] > arr[k]["y"]:
                arr[k]["y"] += 1
            elif arr[k - 1]["y"] < arr[k]["y"]:
                arr[k]["y"] -= 1
        elif abs(arr[k - 1]["x"] - arr[k]["x"]) > 1 and arr[k - 1]["x"] < arr[k]["x"]:
            arr[k]["x"] = arr[k - 1]["x"] + 1
            if arr[k - 1]["y"] > arr[k]["y"]:
                arr[k]["y"] += 1
            elif arr[k - 1]["y"] < arr[k]["y"]:
                arr[k]["y"] -= 1
        elif abs(arr[k - 1]["y"] - arr[k]["y"]) > 1 and arr[k - 1]["y"] > arr[k]["y"]:
            arr[k]["y"] = arr[k - 1]["y"] - 1
            if arr[k - 1]["x"] > arr[k]["x"]:
                arr[k]["x"] += 1
            elif arr[k - 1]["x"] < arr[k]["x"]:
                arr[k]["x"] -= 1
        elif abs(arr[k - 1]["y"] - arr[k]["y"]) > 1 and arr[k - 1]["y"] < arr[k]["y"]:
            arr[k]["y"] = arr[k - 1]["y"] + 1
            if arr[k - 1]["x"] > arr[k]["x"]:
                arr[k]["x"] += 1
            elif arr[k - 1]["x"] < arr[k]["x"]:
                arr[k]["x"] -= 1
    visitedCoordinatesSet.add((str(arr[9]["x"]) + ',' + str(arr[9]["y"])))

for line in data:
    lineSplit = line.split()
    if lineSplit[0] == 'L':
        for i in range(0, int(lineSplit[1])):
            arr[0]["x"] -= 1
            moveTails(arr, visitedCoordinatesSet)
    elif lineSplit[0] == 'R':
        for i in range(0, int(lineSplit[1])):
            arr[0]["x"] += 1
            moveTails(arr, visitedCoordinatesSet)
    elif lineSplit[0] == 'U':
        for i in range(0, int(lineSplit[1])):
            arr[0]["y"] += 1
            moveTails(arr, visitedCoordinatesSet)
    elif lineSplit[0] == 'D':
        for i in range(0, int(lineSplit[1])):
            arr[0]["y"] -= 1
            moveTails(arr, visitedCoordinatesSet)

print(len(visitedCoordinatesSet))