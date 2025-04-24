function getShipSinksAndHits(ships, guesses) {
  const guessSet = new Set(guesses);
  let totalHits = 0;
  let totalSinks = 0;

  const rowToIndex = { A: 0, B: 1, C: 2, D: 3, E: 4 };
  const indexToRow = ["A", "B", "C", "D", "E"];

  function getShipCoordinates(start, end) {
    const parse = (coord) => {
      const row = rowToIndex[coord[0]];
      const col = parseInt(coord.slice(1)) - 1;
      return [row, col];
    };

    const [startRow, startCol] = parse(start);
    const [endRow, endCol] = parse(end);
    const coordinates = [];

    // If the ship is horizontal (same row)
    if (startRow === endRow) {
      for (
        let col = Math.min(startCol, endCol);
        col <= Math.max(startCol, endCol);
        col++
      ) {
        coordinates.push(`${indexToRow[startRow]}${col + 1}`);
      }
    } else {
      for (
        let row = Math.min(startRow, endRow);
        row <= Math.max(startRow, endRow);
        row++
      ) {
        coordinates.push(`${indexToRow[row]}${startCol + 1}`);
      }
    }

    return coordinates;
  }

  // Loop through each ship
  for (const [start, end] of ships) {
    const shipCells = getShipCoordinates(start, end);
    const hitsOnThisShip = shipCells.filter((cell) => guessSet.has(cell));

    totalHits += hitsOnThisShip.length;

    // If all ship cells were hit, it's a sink
    if (hitsOnThisShip.length === shipCells.length) {
      totalSinks += 1;
    }
  }

  return [totalHits, totalSinks];
}


// const ships = [["B3", "D3"]];

// const guesses = ["C3"];

// console.log(getShipSinksAndHits(ships, guesses));