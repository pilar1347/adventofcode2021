const fs = require("fs");

const main = (num) => {
  const inputFile = fs.readFileSync(`./${num}.txt`, "utf-8");
  let input = inputFile.split("\n");

  const mostCommon = (counts) => {
    if (counts[0] > counts[1]) return "0";
    return "1";
  };

  const leastCommon = (counts) => {
    if (counts[1] < counts[0]) return "1";
    return "0";
  };

  const checkRow = (list, atIndex, type) => {
    let counts = [0, 0];
    list.forEach((item) => {
      const digit = item[atIndex];
      counts[Number(digit)] += 1;
    });

    if (type === "O") {
      return mostCommon(counts);
    }
    if (type === "CO") {
      return leastCommon(counts);
    }
  };

  let oList = input.slice();
  let coList = input.slice();

  for (let i = 0; i < input[0].length; i++) {
    const oDigit = checkRow(oList, i, "O");
    const coDigit = checkRow(coList, i, "CO");

    oList = oList.filter((x) => x[i] === oDigit);
    if (coList.length > 1) {
      coList = coList.filter((x) => x[i] === coDigit);
    }
  }

  console.log(parseInt(oList[0], 2) * parseInt(coList[0], 2));
};

main(10);
