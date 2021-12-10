import math
# Could not get this one to work, so switched to good ole JS

def readInput():
  with open('9.txt') as f:
    lines = f.readlines()
    return list(map(lambda x: x.strip(), lines))

def main():
  input = readInput()
  input = ['2199943210','3987894921','9856789892','8767896789','9899965678']

  checked = []
  inABasin = []

  def getPoint(row, col):
    if 0 <= row < len(input) and 0 <= col < len(input[0]):
      return [input[row][col], row, col]
    return None

  def getNeighbors(row, col):
    return list(filter(None, [
      getPoint(row-1,col), getPoint(row+1,col), getPoint(row, col+1), getPoint(row, col-1)
    ]))
  
  def checkIfLowPoint(point, row, col):
    neighbors = getNeighbors(row, col)
    isLowPoint = all(int(n[0]) > int(point) for n in neighbors)
    return neighbors if isLowPoint else []

  def getBasinSize(point):
    if point in checked or point in inABasin or point[0] == '9':
      return 0
    checked.append(point)
    
    neighbors = getNeighbors(point[1], point[2])
    greaterNs = list(filter(lambda x: x[0] >= point[0], neighbors))
    if len(greaterNs) > 0:
      inABasin.append(point)
      return 1 + sum([getBasinSize(n) for n in greaterNs])
    else:
      return 0
  
  basins = []

  for i, line in enumerate(input):
    for j, point in enumerate(list(line)):
      if point == '9' or [point,i,j] in inABasin:
        continue

      lowPointNeighbors = checkIfLowPoint(point, i, j)
      if len(lowPointNeighbors) > 0:
        checked = []
        basinSize = 1 + sum([getBasinSize(x) for x in lowPointNeighbors])
        basins.append(basinSize)

  basins.sort()
  largest = basins[-3:]
  print(len(inABasin))
  print(math.prod(largest))

# 1270395 too low
# 1282494 too low

main()