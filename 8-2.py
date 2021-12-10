def readInput():
  with open('8.txt') as f:
    lines = f.readlines()
    return list(map(lambda line : line.strip().split(' | '), lines))

def main():
  input = readInput()
  
  easyMap = [None] * 9
  easyMap[1] = 2
  easyMap[4] = 4
  easyMap[7] = 3
  easyMap[8] = 7

  def hasInCommon(solidD, newD, amt):
    count = 0
    for char in solidD:
      if char in newD:
        count += 1
    return True if amt == count else False

  def hasAllOf(solidD, newD):
    for char in solidD:
      if char not in newD:
        return False
    return True

  def identifyDigit(d, digitMap):
    if len(d) == 6:
      if hasAllOf(digitMap[4], d):
        return 9
      elif hasAllOf(digitMap[1], d):
        return 0
      else:
        return 6
    else:
      if hasAllOf(digitMap[1], d):
        return 3
      elif hasInCommon(digitMap[4], d, 3):
        return 5
      else:
        return 2

  orgStr = lambda x: ''.join(sorted(list(x)))

  total = 0

  for line in input:
    digitMap = [[]] * 10
    [digits, output] = line
    digitArr =  digits.split(' ')

    for item in digitArr:
      if len(item) in easyMap:
        isDigit = easyMap.index(len(item))
        digitMap[isDigit] = orgStr(item)

    for item in digitArr:
      if len(item) not in easyMap:
        isDigit = identifyDigit(item, digitMap)
        digitMap[isDigit] = orgStr(item)

    finalNumberArr = []
    for item in output.split(' '):
      sortedItem = orgStr(item)
      isDigit = digitMap.index(sortedItem)
      finalNumberArr.append(isDigit)

    finalNumber = int(''.join([str(int) for int in finalNumberArr]))
    total += finalNumber
  
  print(total)

main()
