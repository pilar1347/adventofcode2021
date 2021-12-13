const fs = require("fs");

const main = () => {
  const inputFile = fs.readFileSync(`./11.txt`, "utf-8");
  let input = inputFile.split("\n");
  // input = ['5483143223','2745854711','5264556173','6141336146','6357385478','4167524645','2176841721','6882881134','4846848554','5283751526']

  const getPoint = (row, col) => {
    if (0 <= row && row < input.length && 0 <= col && col < input[0].length)
      return [row, col]
    return false
  }

  const getNeighbors = (row, col) => {
    return [
      getPoint(row-1,col), getPoint(row+1,col), getPoint(row, col+1), getPoint(row, col-1), getPoint(row-1, col-1), getPoint(row-1,col+1), getPoint(row+1,col+1), getPoint(row+1,col-1)
    ].filter(Boolean)
  }

  let hasFlashed = []

  const replaceAt = (i, j, n) => input[i].substr(0, j) + n.toString() + input[i].substr(j + 1)

  const increase = (i, j) => {
    if (input[i][j] === 'x') return 0

    const n = parseInt(input[i][j]) + 1
    if (n > 9) {
      input[i] = replaceAt(i, j, 'x')
      hasFlashed.push([i,j])
      neighbors = getNeighbors(i,j)
      return 1 + neighbors.map(x => increase(...x)).reduce((a,b) => a + b, 0)
    } else {
      input[i] = replaceAt(i,j,n);
      return 0
    }
  }

  const setZeros = () => {
    hasFlashed.forEach(coord => {
      input[coord[0]] = replaceAt(...coord, 0)
    })
  }

  const runStep = stepCount => {
    let flashes = 0
    const totalOctopi = input[0].length * input.length;
  
    for (let s=0; s<stepCount; s++) {
      hasFlashed = [];
      let thisStepFlashCount = 0;
      for (let i=0; i<input.length; i++) {
        for (let j=0; j<input[0].length; j++) {
          const f = increase(i, j);
          flashes += f;
          thisStepFlashCount += f;
        }
      }
      setZeros()
      if (thisStepFlashCount === totalOctopi) {
        console.log('match at', s + 1)
        break;
      }
    }
    return flashes
  }

  totalFlashes = runStep(300)
  console.log(totalFlashes)
  console.log(input.join('\n'))

  // 35 after 2, 204 after 10
}

main();
