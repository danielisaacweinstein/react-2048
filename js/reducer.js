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
    currentGrid: getInitialConfiguration(),
    gameOver: false
  });

  return state.merge(initialState);
}

function getShiftedState(state, incomingData) {
  var keyCode = incomingData.keyCode;
  var grid = state.get('currentGrid');

  // Workaround for valid keyCodes; Object.values() not yet supported in Chrome.
  var directionCodes = Object.keys(DIRECTIONS).map(function(key) {
    return DIRECTIONS[key];
  });

  // If input is not a valid direction, return state without manipulation.
  if (!directionCodes.includes(keyCode)) { return state; }

  var canCollapseGivenDirection = canDirectionCollapse(grid, keyCode);
  var canCollapseAnyDirection = isGridCollapsable(grid);
  var hasFreeSpace = doesGridHaveFreeSpace(grid);

  if (canCollapseGivenDirection) {
    state = getCollapsedGrid(state, keyCode);
    state = addNumberToGrid(state);

    canCollapseAnyDirection = isGridCollapsable(grid);
    state = canCollapseAnyDirection ? state : state.set('gameOver', true);
  } else if (!hasFreeSpace && !canCollapseAnyDirection) {
    state = state.set('gameOver', true);
  }

  if (state.get('gameOver') == true) {
    console.log('game is over!');
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
