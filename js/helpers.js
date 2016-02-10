import * as Immutable from 'immutable'

export const DIRECTIONS = {
  down: 40,
  left: 37,
  right: 39,
  up: 38
};

export function rotate90(grid) {
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

export function doesGridHaveFreeSpace(grid) {
  var hasFreeSpace = grid.reduce(function(foundSpaceInGridYet, row) {
    var isSpaceInRow = row.reduce(function(foundSpaceInRowYet, cell) {
      var isCellFree = cell === undefined;
      return isCellFree || foundSpaceInRowYet;
    }, false);
    return isSpaceInRow || foundSpaceInGridYet;
  }, false);

  return hasFreeSpace;
}
