import * as Immutable from 'immutable'
import { DIRECTIONS, rotate90 } from './helpers.js'

function shiftGrid(grid) {
  var newGrid = grid.map(function(row, rowIndex) {
    var newRow = row.reduce(function(cellsSoFar, currentCell) {
      var isEmpty = currentCell === undefined;
      return isEmpty ? cellsSoFar : cellsSoFar.push(currentCell);
    }, Immutable.fromJS([]));
    return newRow;
  });

  return newGrid;
}

function collapseGrid(grid) {
  var newGrid = grid.map(function(row, rowIndex) {
    var newRow = row.reduce(function(currentRow, currentCell, index, row) {
      
      var currentValue = currentRow.get(index);
      var restOfRow = currentRow.slice(index + 1);

      var fullIndexInRestOfRow = restOfRow.findIndex(function(cell) {
        return (cell !== undefined) ? true : false;
      });

      if (fullIndexInRestOfRow !== -1) {
        var nextIndex = index + fullIndexInRestOfRow + 1;
        var contentsMatch = (currentRow.get(index) === currentRow.get(nextIndex));

        if (contentsMatch) {
          currentRow = currentRow.set(index, currentValue * 2);
          currentRow = currentRow.set(nextIndex, undefined);
        }
      }
      return currentRow;
    }, row)
    return newRow;
  });
  return newGrid;
}

function fillGrid(grid) {
  var newGrid = grid.map(function(row, rowIndex) {
    while (row.size < 4) { row = row.push(undefined); }
    return row;
  });

  return newGrid;
}

function getCollapser(direction) {
  var firstRotationCount, secondRotationCount;

  if (direction === DIRECTIONS.left) {
    firstRotationCount = 0;
    secondRotationCount = 0;
  } else if (direction === DIRECTIONS.right) {
    firstRotationCount = 2;
    secondRotationCount = 2;
  } else if (direction === DIRECTIONS.up) {
    firstRotationCount = 3;
    secondRotationCount = 1;
  } else if (direction === DIRECTIONS.down) {
    firstRotationCount = 1;
    secondRotationCount = 3;
  }

  return function(grid) {
    for (let i = 0; i < firstRotationCount; i++) {
      grid = rotate90(grid);
    }

    grid = collapseGrid(grid);
    grid = shiftGrid(grid);
    grid = fillGrid(grid);

    for (let i = 0; i < secondRotationCount; i++) {
      grid = rotate90(grid);
    }

    return grid;
  }
}

export function getCollapsedGrid(state, keyCode) {
  var grid     = state.get('currentGrid');
  var collapse = getCollapser(keyCode);

  grid = collapse(grid);
  state = state.set('currentGrid', grid);

  return state;
}

export function canDirectionCollapse(grid, input) {
  var collapse = getCollapser(DIRECTIONS.left)
  var rotationCount;

  switch (input) {
    case 37: // Left
      rotationCount = 0;
      break;
    case 38: // Up
      rotationCount = 1;
      break;
    case 39: // Right
      rotationCount = 2;
      break;
    case 40: // Down
      rotationCount = 3;
      break;
  }

  var rotatedGrid = grid;

  for (let i = 0; i < rotationCount; i++) {
    rotatedGrid = rotate90(rotatedGrid);
  }

  var collapsedGrid = collapse(rotatedGrid);
  var collapsable = !Immutable.is(rotatedGrid, collapsedGrid);

  return collapsable ? true : false;
}

export function isGridCollapsable(grid) {
  var collapse = getCollapser(DIRECTIONS.left);

  var gridCollapsed  = collapse(grid);
  
  var firstRotation  = rotate90(grid);
  var firstRotationCollapsed = collapse(firstRotation);

  var secondRotation = rotate90(firstRotation);
  var secondRotationCollapsed = collapse(secondRotation);

  var thirdRotation  = rotate90(secondRotation);
  var thirdRotationCollapsed = collapse(thirdRotation);

  var notCollapsable = (Immutable.is(grid, gridCollapsed) &&
                        Immutable.is(firstRotation, firstRotationCollapsed) &&
                        Immutable.is(secondRotation, secondRotationCollapsed) &&
                        Immutable.is(thirdRotation, thirdRotationCollapsed))

  return !notCollapsable;
}
