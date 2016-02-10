import * as Immutable from 'immutable'
import { getCollapsedGrid } from './collapseLogic.js'
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
  var gridHasFreeSpace = doesGridHaveFreeSpace(state.get('currentGrid'));

  // TODO: add and define isCollapsable for following conditional
  if (validDirection && gridHasFreeSpace) {
    state = getCollapsedGrid(state, incomingData);
    state = addNumberToGrid(state);
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
