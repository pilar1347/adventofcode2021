const fs = require("fs");

const main = () => {
  const inputFile = fs.readFileSync(`./12.txt`, "utf-8");
  let input = inputFile.split("\n");
  // input = ['dc-end','HN-start','start-kj','dc-start','dc-HN','LN-dc','HN-end','kj-sa','kj-HN','kj-dc'] //103
  // input = ['fs-end','he-DX','fs-he','start-DX','pj-DX','end-zg','zg-sl','zg-pj','pj-he','RW-he','fs-DX','pj-RW','zg-RW','start-pj','he-WI','zg-he','pj-fs','start-RW'] // 3509
  // input = ['start-A','start-b','A-c','A-b','b-d','A-end','b-end'] // 36

  const map = {};
  const vertices = [];

  const addToMap = (from, to) => {
    if (to === 'start') return;
    if (!map[from]) {
      vertices.push(from);
      map[from] = [];
    }
    map[from].push(to);
  }

  input.forEach(entry => {
    const [a,b] = entry.split('-');

    addToMap(a, b);
    addToMap(b, a);
  });

  const printAllPaths = () => {
    const pathList = [];
    pathList.push('start');
    printAllPathsUtil('start', pathList);
  }

  let pathCount = 0;

  const printAllPathsUtil = (u, localPathList) => {
    const isLowerCase = x => x.toLowerCase() === x;

    if (u === 'end') {
      // console.log(localPathList);
      pathCount += 1;
      return;
    }
    
    
    for (let i=0; i<map[u].length; i++) {
      const node = map[u][i];
      if (node === 'start') continue;

      const isUnvisitedNode = localPathList.indexOf(node) < 0;
      const isUppercaseNode = node.toUpperCase() === node;

      let pathHasDouble = false;

      localPathList.forEach((x, j) => {
        if (isLowerCase(x) && localPathList.indexOf(x) < j) {
          pathHasDouble = true;
        }
      });
      const isDoubleable = !isUnvisitedNode && !isUppercaseNode && !pathHasDouble;

      if (isUnvisitedNode || isUppercaseNode) {
        printAllPathsUtil(node, [...localPathList, node]);
      } else if(isDoubleable) {
        printAllPathsUtil(node, [...localPathList, node]);
      }
    }
  }

  printAllPaths();
  console.log(pathCount);
  
}

main();
