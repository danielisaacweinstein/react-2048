function getRandomFreeIndex(grid) {
  var xIndex, yIndex;

  do {
    xIndex = Math.floor(Math.random() * grid.length);
    yIndex = Math.floor(Math.random() * grid.length);    
  } while (grid[xIndex][yIndex] !== undefined)

  return [xIndex, yIndex];
}

export function getInitialConfiguration() {
  var values = [2, 4];
  var grid = [
    [ , , , ,],
    [ , , , ,],
    [ , , , ,],
    [ , , , ,]
  ];

  for (let i = 0; i < 2; i++) {
    let [x, y] = getRandomFreeIndex(grid);
    grid[x][y] = values[Math.floor(Math.random() * values.length)];    
  }

  return grid;
}