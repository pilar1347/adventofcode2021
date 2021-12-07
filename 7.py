def readInput():
  with open('7.txt') as f:
    lines = f.readlines()
    return list(map(int, lines[0].strip().split(',')))

def main():
  input = readInput()
  # input = [16,1,2,0,4,2,7,1,2,14]
  input.sort()

  inputLength = len(input)
  isEven = inputLength % 2 == 0
  mid = int(inputLength / 2)
  middleValues = input[mid - 1:mid + 1] if isEven else [input[mid]]


  def getCost(n):
    totalCost = 0
    for crab in input:
      totalCost += abs(crab - n)
    return totalCost

  result = map(getCost, middleValues)

  print(min(list(result)))

main()
