const fs = require("fs");

const main = (num) => {
    const inputFile = fs.readFileSync(`./${num}.txt`, "utf-8");
    let input = inputFile;

    // input =
    //     "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n\n22 13 17 11  0\n8  2 23  4 24\n21  9 14 16  7\n6 10  3 18  5\n1 12 20 15 19\n\n3 15  0  2 22\n9 18 13 17  5\n19  8  7 25 23\n20 11 10 24  4\n14 21 16 12  6\n\n14 21 17 24  4\n10 16 15  9 19\n18  8 23 26 20\n22 11 13  6  5\n2  0 12  3  7";

    const numbers = input.split("\n")[0].split(",").map(Number);

    let boards = input
        .split("\n\n")
        .slice(1)
        .map((board) => {
            return board.split("\n").map((row) => {
                return row.split(/\s+/).map(Number);
            });
        });

    const checkForBingo = (board) => {
        let diags = [true, true];
        const totalRows = board.length;

        for (let j = 0; j < board.length; j++) {
            const row = board[j];

            if (row.join("") === Array(row.length).fill("X").join("")) {
                return true;
            }
            for (let k = 0; k < row.length; k++) {
                let cell = row[k];
                if (k === j && cell !== "X") {
                    diags[0] = false;
                }
                if (j + k === totalRows && cell !== "X") {
                    diags[1] = false;
                }
                if (cell === "X") {
                    const column = board.map((r) => r[k]).join("");
                    if (column === Array(board.length).fill("X").join("")) {
                        return true;
                    }
                }
            }
        }
        if (diags[0] || diags[1]) return true;
        return false;
    };

    const isBingoed = [];

    for (let i = 0; i < numbers.length; i++) {
        const n = numbers[i];
        for (let j = 0; j < boards.length; j++) {
            const board = boards[j];

            if (!isBingoed.includes(j)) {
                for (let k = 0; k < board.length; k++) {
                    const row = board[k];
                    if (row.includes(n)) {
                        row[row.indexOf(n)] = "X";
                        const isBingo = checkForBingo(board);
                        if (isBingo) {
                            isBingoed.push(j);

                            if (isBingoed.length === boards.length) {
                                // this is the final board
                                const sum = board.reduce((acc, row) => {
                                    return (acc += row.reduce((a, numb) => {
                                        if (numb !== "X") {
                                            return (a += numb);
                                        }
                                        return a;
                                    }, 0));
                                }, 0);
                                console.log(sum * n);
                                return "ISBINGO";
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
    console.log("NO BINGO");
};

console.log(main(4));