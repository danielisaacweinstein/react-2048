import * as Immutable from 'immutable'

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

function rotate90(grid) {
  var lines = [];

  for (var i = 0; i < grid.size; i++) {
    var line = [];
    
    for (var j = grid.size - 1; j >= 0; j--) {
      line.push(grid.getIn([j, i]));
    }
    lines.push(line);
  }
 
  return Immutable.fromJS(lines);
}

function getCollapser(direction) {
  var [down, left, right, up] = [40, 37, 39, 38];

  var firstRotationCount;
  var secondRotationCount;

  if (direction === left) {
    firstRotationCount = 0;
    secondRotationCount = 0;
  } else if (direction === right) {
    firstRotationCount = 2;
    secondRotationCount = 2;
  } else if (direction === up) {
    firstRotationCount = 3;
    secondRotationCount = 1;
  } else if (direction === down) {
    firstRotationCount = 1;
    secondRotationCount = 3;
  }

  return function(grid) {
    for (let i = 0; i < firstRotationCount; i++) {
      grid = rotate90(grid);
    }

    grid = shiftGrid(grid);
    grid = collapseGrid(grid);
    grid = shiftGrid(grid);
    grid = fillGrid(grid);

    for (let i = 0; i < secondRotationCount; i++) {
      grid = rotate90(grid);
    }

    return grid;
  }
}

export function getCollapsedGrid(state, incomingData) {
  var grid = state.get('currentGrid');
  var keyInput = incomingData.keyCode;
  var validDirection = [40, 37, 39, 38].includes(keyInput);

  if (validDirection) {
    var collapse = getCollapser(keyInput);
    grid = collapse(grid);
    state = state.set('currentGrid', grid);
  }

  return state;
}
