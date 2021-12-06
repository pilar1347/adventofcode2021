import math

def readInput():
  with open('6.txt') as f:
    lines = f.readlines()
    return list(map(int, lines[0].strip().split(',')))


def spawnFish(n, days):
  spawnIn = n + 1
  if spawnIn > days:
    return 1

  totalSpawns = math.floor((days - spawnIn) / 7) + 1
  childSpawns = 0
  for d in range(totalSpawns):
    daysLeft = (days - spawnIn) - (7 * d)
    childSpawns += spawnFish(8, daysLeft)

  return childSpawns + 1

def main():
  input = readInput()
  input = [3,4,3,1,2]
  
  total = 0
  for fish in input:
    days = 18
    n = spawnFish(fish, days)
    total += n
  
  print(total)

main()
