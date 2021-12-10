def readInput():
  with open('8.txt') as f:
    lines = f.readlines()
    return list(map(lambda line : line.strip().split(' | '), lines))

def main():
  input = readInput()
  
  count = 0

  digitMap = [2,4,3,7]

  for line in input:
    output = line[1].split(' ')
    for digit in output:
      if len(digit) in digitMap:
        count += 1

  print(count)

main()
