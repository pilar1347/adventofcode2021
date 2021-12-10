def readInput():
  with open('9.txt') as f:
    lines = f.readlines()
    return list(map(lambda x: x.strip(), lines))

def main():
  input = readInput()
  # input = ['2199943210','3987894921','9856789892','8767896789','9899965678']

  def getPoint(row, col):
    try:
      return input[row][col]
    except IndexError:
      return None
  
  def isLowPoint(point, row, col):
    neighbors = [
      getPoint(row-1,col), getPoint(row+1,col), getPoint(row, col+1), getPoint(row, col-1)
    ]

    return all(int(n) > int(point) for n in neighbors if n)
  
  risk = 0

  for i, line in enumerate(input):
    for j, point in enumerate(list(line)):
      isLowest = isLowPoint(point, i, j)
      risk += int(point) + 1 if isLowest else 0

  print(risk)


main()
