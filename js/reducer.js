import * as Immutable from 'immutable'
import { DIRECTIONS,
         doesGridHaveFreeSpace } from './helpers.js'
import { getInitialConfiguration,
         addNumberToGrid } from './gameflowLogic.js'
import { getCollapsedGrid,
         canDirectionCollapse,
         isGridCollapsable } from './collapseLogic.js'

function getInitialState(state) {
  var initialState = Immutable.fromJS({
    currentGrid: getInitialConfiguration()
  });

  return state.merge(initialState);
}

function getShiftedState(state, incomingData) {
  var input = incomingData.keyCode;
  var grid = state.get('currentGrid');

  // Workaround for valid keyCodes; Object.values() not yet supported in Chrome.
  var directionCodes = Object.keys(DIRECTIONS).map(function(key) {
    return DIRECTIONS[key];
  });

  var validDirection = directionCodes.includes(input);
  var canCollapseInDirection = validDirection && canDirectionCollapse(grid, input);
  var hasFreeSpace = doesGridHaveFreeSpace(grid);
  var isCollapsable = isGridCollapsable(grid);

  // if (canCollapseInDirection) {
  //   // console.log("collapse")
  //   state = getCollapsedGrid(state, incomingData);
  // }

  if (isCollapsable && canCollapseInDirection) {
    state = getCollapsedGrid(state, incomingData)
  }


  if (hasFreeSpace) {
    // console.log("Add number")
    state = addNumberToGrid(state);
  }

  if (!isCollapsable) {
    debugger;
  }

  return state;
}

function reducer(state = Immutable.Map(), action) {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return getInitialState(state);
    case 'SHIFT':
      return getShiftedState(state, action.data);
  }
  return state;
}

export default reducer
