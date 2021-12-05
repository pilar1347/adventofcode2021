const fs = require("fs");

const main = (num, includeDiags) => {
  let inputFile = fs.readFileSync(`./${num}.txt`, "utf-8");
  // inputFile = `0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2`;
  let input = inputFile.split("\n");

  let overlaps = 0;
  const map = {};

  const sortAsc = (a, b) => a - b;

  const addPtToMap = (pt) => {
    map[pt] = map[pt] || 0;
    map[pt] += 1;
    if (map[pt] === 2) {
      overlaps += 1;
    }
  };

  const isInRange = (n, range) => {
    range.sort(sortAsc);
    return n >= range[0] && n <= range[1];
  };

  const increment = (n, range) => {
    if (range[0] === range[1]) return n;
    return (n += range[1] > range[0] ? 1 : -1);
  };

  for (let i = 0; i < input.length; i++) {
    const points = input[i].split(" -> ");
    const [x1, y1] = points[0].split(",").map(Number);
    const [x2, y2] = points[1].split(",").map(Number);

    const isDiagonal = x1 !== x2 && y1 !== y2;

    if (!isDiagonal || includeDiags) {
      let [x, y] = [x1, y1];
      while (isInRange(x, [x1, x2]) && isInRange(y, [y1, y2])) {
        const pt = `${x},${y}`;
        addPtToMap(pt);
        x = increment(x, [x1, x2]);
        y = increment(y, [y1, y2]);
      }
    }
  }
  return overlaps;
};

console.log(main(5, false));
