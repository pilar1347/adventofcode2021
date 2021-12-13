def readInput():
  with open('9.txt') as f:
    lines = f.readlines()
    return list(map(lambda x: x.strip(), lines))

def main():
  input = readInput()
  input = ['5483143223','2745854711','5264556173','6141336146','6357385478','4167524645','2176841721','6882881134','4846848554','5283751526']

  def getPoint(row, col):
    if 0 <= row < len(input) and 0 <= col < len(input[0]):
      return [row, col]
    return None

  def getNeighbors(row, col):
    return list(filter(None, [
      getPoint(row-1,col), getPoint(row+1,col), getPoint(row, col+1), getPoint(row, col-1), getPoint(row-1, col-1), getPoint(row-1,col+1), getPoint(row+1,col+1), getPoint(row+1,col-1)
    ]))

  assignNewValue = lambda i,j,n: input[i][:j] + str(n) + input[i][j+1:]

  hasFlashed = []

  def increase(i, j):
    if input[i][j] == 'x':
      return 0

    n = int(input[i][j]) + 1
    if n > 9:
      input[i] = assignNewValue(i,j,'x')
      hasFlashed.append((i,j))
      neighbors = getNeighbors(i,j)
      return 1 + sum([increase(*x) for x in neighbors])
    else:
      input[i] = assignNewValue(i,j,n)
      return 0    

  def setZeros():
    for coord in hasFlashed:
      input[coord[0]] = assignNewValue(*coord,0)

  def runStep(stepCount):
    flashes = 0
    for step in range(stepCount):
      for i in range(len(input)):
        for j in range(len(input[0]) - 1):
          hasFlashed = []
          flashes += increase(i, j)
      setZeros()

    return flashes

  totalFlashes = runStep(2)
  print(totalFlashes)
  print('\n'.join(input))

  # 35 after 2, 204 after 10
  # 770636

main()

