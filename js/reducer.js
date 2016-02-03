import * as Immutable from 'immutable'

function getInitialState(state) {
  var initialState = Immutable.fromJS({
    currentGrid: [
      [2,2,6,2,],
      [ , ,2, ,],
      [8, , ,8,],
      [ ,4, , ,]
    ]
  });

  return state.merge(initialState);
}

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

function getShiftedGrid(state, incomingData) {
  var newGrid = state.get('currentGrid');

  newGrid = shiftGrid(newGrid);
  newGrid = collapseGrid(newGrid);
  newGrid = shiftGrid(newGrid);
  newGrid = fillGrid(newGrid);

  state = state.set('currentGrid', newGrid);

  return state;
}


function reducer(state = Immutable.Map(), action) {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return getInitialState(state);
    case 'SHIFT':
      return getShiftedGrid(state, action.data);
  }
  return state;
}

export default reducer
