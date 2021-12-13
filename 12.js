const fs = require("fs");

const main = () => {
  const inputFile = fs.readFileSync(`./12.txt`, "utf-8");
  let input = inputFile.split("\n");
  // input = ['dc-end','HN-start','start-kj','dc-start','dc-HN','LN-dc','HN-end','kj-sa','kj-HN','kj-dc'] //19
  // input = ['fs-end','he-DX','fs-he','start-DX','pj-DX','end-zg','zg-sl','zg-pj','pj-he','RW-he','fs-DX','pj-RW','zg-RW','start-pj','he-WI','zg-he','pj-fs','start-RW'] // 226

  const map = {};
  const vertices = [];

  input.forEach(entry => {
    const [a,b] = entry.split('-');
    if (!map[a]) {
      vertices.push(a)
      map[a] = [];
    }
    map[a].push(b);

    if (!map[b]) {
      vertices.push(b);
      map[b] = [];
    }
    map[b].push(a);
  });
  console.log(map);

  const printAllPaths = () => {
    const visited = {};
    for(let i=0; i<vertices.length; i++) {
      visited[vertices[i]] = false;
    }
    const pathList = [];
    pathList.push('start');
    printAllPathsUtil('start', 'end', visited, pathList);
  }

  let pathCount = 0;

  const printAllPathsUtil = (u, d, visited, localPathList) => {
    if (u === d) {
      // console.log(localPathList);
      pathCount += 1;
      return;
    }
    
    if (u.toLowerCase() === u) {
      visited[u] = true;
    }

    for (let i=0; i<map[u].length; i++) {
      if (!visited[map[u][i]]) {
        localPathList.push(map[u][i]);
        printAllPathsUtil(map[u][i], d, visited, localPathList);
        localPathList.splice(localPathList.indexOf(map[u][i]), 1);
      }
    }
  
    visited[u] = false;
  }


  printAllPaths();
  console.log(pathCount);
  
}

main();
