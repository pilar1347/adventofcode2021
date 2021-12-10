const fs = require("fs");

const main = () => {
  const inputFile = fs.readFileSync(`./9.txt`, "utf-8");
  let input = inputFile.split("\n");
  // input = ['2199943210','3987894921','9856789892','8767896789','9899965678']

  const grid = input.map(x => x.split('').map(Number));

  const getPoint = (row, col) => {
    if (0 <= row && row < grid.length && 0 <= col && col < grid[0].length) {
      return [row, col]
    }
    return false;
  }

  const getNeighbors = (row, col) => {
    return [
      getPoint(row-1,col), getPoint(row+1,col), getPoint(row, col+1), getPoint(row, col-1)
    ].filter(Boolean);
  }

  const getBasinSize = (row, col) => {
    if (grid[row][col] === 'x' || grid[row][col] === 9) return 0;
    grid[row][col] = 'x';

    const neighbors = getNeighbors(row, col);
    if (neighbors.length === 0) return 1;

    const neighborHood = neighbors.map(x => getBasinSize(...x));
    return 1 + neighborHood.reduce((acc, x) => acc + x, 0);
  }

  const basins = [];

  for (let i=0; i<grid.length; i++) {
    const line = grid[i];
    for (let j=0; j<line.length; j++) {
      const point = line[j];
      if (point === 9 || point === 'x') {
        grid[i][j] = 'x';
      } else {
        const size = getBasinSize(i, j);
        basins.push(size);        
      }
    }
  }

  basins.sort((a, b) => a-b);
  largest = basins.slice(-3)
  const product = largest.reduce((acc, x) => x * acc, 1)
  console.log(product)
}

main()