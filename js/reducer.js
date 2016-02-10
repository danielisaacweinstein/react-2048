import * as Immutable from 'immutable'
import { getCollapsedGrid, isGridCollapsable } from './collapseLogic.js'
import { DIRECTIONS, doesGridHaveFreeSpace } from './helpers.js'
import { getInitialConfiguration,
         addNumberToGrid } from './gameflowLogic.js'

function getInitialState(state) {
  var initialState = Immutable.fromJS({
    currentGrid: getInitialConfiguration()
  });

  return state.merge(initialState);
}

function getShiftedState(state, incomingData) {
  var keyInput = incomingData.keyCode;
  var directionCodes = Object.keys(DIRECTIONS).map(function(key) {
    return DIRECTIONS[key];
  });

  var validDirection = directionCodes.includes(keyInput);
  var hasFreeSpace = doesGridHaveFreeSpace(state.get('currentGrid'));
  var isCollapsable = isGridCollapsable(state.get('currentGrid'));

  // TODO: add and define isCollapsable for following conditional

  console.log("\n\n")
  console.log("validDirection?");
  console.log(validDirection);
  console.log("hasFreeSpace?");
  console.log(hasFreeSpace);
  console.log("isCollapsable?");
  console.log(isCollapsable);

  if (validDirection && (hasFreeSpace || isCollapsable)) {
    state = getCollapsedGrid(state, incomingData);
    state = addNumberToGrid(state);
  } else {
    console.log("Grid can't collapse!");
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
