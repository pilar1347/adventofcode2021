def readInput():
  with open('10.txt') as f:
    lines = f.readlines()
    return list(map(lambda x: x.strip(), lines))

def main():
  input = readInput()
  # input = ['[({(<(())[]>[[{[]{<()<>>','[(()[<>])]({[<{<<[]>>(','{([(<{}[<>[]}>{[]{[(<()>','(((({<>}<{<{<>}{[]{[]{}','[[<[([]))<([[{}[[()]]]','[{[{({}]{}}([{[{{{}}([]','{<[[]]>}<{[{[{[]{()[[[]','[<(<(<(<{}))><([]([]()','<{([([[(<>()){}]>(<<{{','<{([{{}}[<[[[<>{}]]]>[]]']


  map = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
  }

  scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  }

  totalScore = 0

  for line in input:
    stack = []
    for char in list(line):
      if char in map:
        stack.append(map[char])
      elif len(stack) == 0 or stack.pop() != char:
        totalScore += scores[char]
        break

  print(totalScore)

main()
