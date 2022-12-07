data = open('input.txt', 'r', encoding='utf-8').read().splitlines()

class Directory:
  def __init__(self, name, directory):
    self.name = name
    self.parentDirectory = directory
    self.space = 0
    self.children = []

  def addSpace(self, space):
    self.space += space

  def addChild(self, directory):
    self.children.append(directory)

  def removeChild(self, name):
    for i in range(0, len(self.children)):
        if self.children[i].name == name:
            self.children.pop(i)
            break


class Directories:
  def __init__(self, directory):
    self.currentDirectory = directory

  def getCurrentDirectory(self):
    return self.currentDirectory

  def moveDown(self, name):
    newCurrentDirectory = None
    for directory in self.currentDirectory.children:
        if directory.name == name:
            newCurrentDirectory = directory
            break
    self.currentDirectory = newCurrentDirectory

  def moveUp(self):
    self.currentDirectory = self.currentDirectory.parentDirectory

  def addSpace(self, directory, space):
    directory.addSpace(space)
    if directory.parentDirectory:
        self.addSpace(directory.parentDirectory, space)

  def addDirectory(self, directory):
    self.currentDirectory.addChild(directory)

  def setCurrentDirectory(self, directory):
    self.currentDirectory = directory

  def getTotal(self, requiredRemovalSpace, currSize):
    if len(self.currentDirectory.children) > 0:
        self.currentDirectory = self.currentDirectory.children[0]
        return self.getTotal(requiredRemovalSpace, currSize)
    elif self.currentDirectory.parentDirectory == None:
        return currSize
    elif self.currentDirectory.space > requiredRemovalSpace and self.currentDirectory.space < currSize:
        space = self.currentDirectory.space
        name = self.currentDirectory.name
        self.currentDirectory = self.currentDirectory.parentDirectory
        self.currentDirectory.removeChild(name)
        return self.getTotal(requiredRemovalSpace, space)
    else:
        name = self.currentDirectory.name
        self.currentDirectory = self.currentDirectory.parentDirectory
        self.currentDirectory.removeChild(name)
        return self.getTotal(requiredRemovalSpace, currSize)



topDirectory = Directory('/', None)
allDirectories = Directories(topDirectory)
  
for line in data:
    lineSplit = line.split()
    if lineSplit[1] == 'cd' and lineSplit[2] == '..':
        allDirectories.moveUp()
    elif lineSplit[1] == 'cd' and lineSplit[2] != '/':
        allDirectories.moveDown(lineSplit[2])
    elif lineSplit[0] == 'dir':
        directory = Directory(lineSplit[1], allDirectories.getCurrentDirectory())
        allDirectories.addDirectory(directory)
    elif lineSplit[0].isnumeric():
        space = int(lineSplit[0])
        currentDirectory = allDirectories.getCurrentDirectory()
        allDirectories.addSpace(currentDirectory, space)


allDirectories.setCurrentDirectory(topDirectory)
requiredRemovalSpace = 30000000 - (70000000 - topDirectory.space)
print(allDirectories.getTotal(requiredRemovalSpace, 70000000))