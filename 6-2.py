def readInput():
  with open('6.txt') as f:
    lines = f.readlines()
    return list(map(int, lines[0].strip().split(',')))

def main():
  input = readInput()  
  timers = [0] * 9

  for time in input:
    timers[time] += 1

  days = 256
  for d in range(days):
    readyToSpawn = timers.pop(0)
    timers.append(readyToSpawn)
    timers[6] += readyToSpawn

  print(sum(timers))
    
main()
