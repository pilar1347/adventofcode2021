def readInput():
  with open('10.txt') as f:
    lines = f.readlines()
    return list(map(lambda x: x.strip(), lines))

def main():
  input = readInput()

  map = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
  }

  scores = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  }

  totalScores = []

  for line in input:
    stack = []
    isValid = True
    score = 0
    for char in list(line):
      if char in map:
        stack.append(map[char])
      elif len(stack) == 0 or stack.pop() != char:
        isValid = False
        break
    if isValid:
      for item in list(reversed(stack)):
        score = (score * 5) + scores[item]
      totalScores.append(score)

  middleScore = sorted(totalScores)[int(len(totalScores)/2)]
  print(middleScore)


main()
