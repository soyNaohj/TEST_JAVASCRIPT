class WordSearch {
  constructor(letterGrid) {
    this.letterGrid = letterGrid;
  }
  module.exports = WordSearch;
  find(words) {
    const result = {};
        const gridHeight = this.letterGrid.length;
        const gridWidth = this.letterGrid[0].length;

        const searchDirections = [
            [0, 1],  // Horizontal, left to right
            [0, -1], // Horizontal, right to left
            [1, 0],  // Vertical, top to bottom
            [-1, 0]  // Vertical, bottom to top
        ];

        for (const word of words) {
            result[word] = undefined; // Initialize as not found

            for (let row = 1; row <= gridHeight; row++) {
                for (let col = 1; col <= gridWidth; col++) {
                    for (const [dx, dy] of searchDirections) {
                        let currentRow = row;
                        let currentCol = col;
                        let found = true;

                        for (let i = 0; i < word.length; i++) {
                            if (
                                currentRow < 1 ||
                                currentRow > gridHeight ||
                                currentCol < 1 ||
                                currentCol > gridWidth ||
                                this.letterGrid[currentRow - 1][currentCol - 1] !== word[i]
                            ) {
                                found = false;
                                break;
                            }

                            currentRow += dx;
                            currentCol += dy;
                        }

                        if (found) {
                            result[word] = {
                                start: [row, col],
                                end: [currentRow - dx, currentCol - dy]
                            };
                            break; // Found the word, stop searching for this word
                        }
                    }
                    if (result[word]) break; // Found the word, stop searching for this word in other starting positions
                }
            }
        }

        return result;
    }
  }
