def readInput():
  with open('7.txt') as f:
    lines = f.readlines()
    return list(map(int, lines[0].strip().split(',')))

def main():
  input = readInput()

  memo = {}
  def getCost(n):
    if n in memo:
      return memo[n]

    totalCost = 0
    for crab in input:
      diff = abs(crab - n)
      totalCost += diff * (diff + 1) / 2

    memo[n] = totalCost
    return totalCost

  def getMinCost(n, min, inc):
    cost = getCost(n)
    if cost <= min:
      return getMinCost(n + inc, cost, inc)
    return min

  average = round(sum(input) / len(input))
  averageCost = getCost(average)
  lowBranch = getMinCost(average - 1, averageCost, -1)
  highBranch = getMinCost(average + 1, averageCost, 1)

  return min([lowBranch, highBranch])

print(main())
