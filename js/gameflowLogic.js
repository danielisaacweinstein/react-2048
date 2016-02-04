import * as Immutable from 'immutable'

function getRandomFreeIndex(grid) {
  var xIndex, yIndex;

  do {
    xIndex = Math.floor(Math.random() * grid.length);
    yIndex = Math.floor(Math.random() * grid.length);    
  } while (grid.getIn([xIndex, yIndex]) !== undefined)

  return [xIndex, yIndex];
}

export function addNumberToGrid(state) {
  var values = [2, 4];
  var grid = state.get('currentGrid');
  var [x, y] = getRandomFreeIndex(grid);

  grid = grid.setIn([x, y], values[Math.floor(Math.random() * values.length)]);
  state = state.set('currentGrid', grid);
  return state;
}

export function getInitialConfiguration() {
  var values = [2, 4];
  var grid = Immutable.fromJS([
    [ , , , ,],
    [ , , , ,],
    [ , , , ,],
    [ , , , ,]
  ]);

  for (let i = 0; i < 2; i++) {
    let [x, y] = getRandomFreeIndex(grid);
    grid = grid.setIn([x, y], values[Math.floor(Math.random() * values.length)]);
  }

  return grid;
}