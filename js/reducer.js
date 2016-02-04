import * as Immutable from 'immutable'
import { getCollapsedGrid } from './collapseLogic.js'
import { getInitialConfiguration,
         addNumberToGrid } from './gameflowLogic.js'

function getInitialState(state) {
  var initialState = Immutable.fromJS({
    currentGrid: getInitialConfiguration()
  });

  return state.merge(initialState);
}

function reducer(state = Immutable.Map(), action) {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return getInitialState(state);
    case 'SHIFT':
      state = getCollapsedGrid(state, action.data);
      state = addNumberToGrid(state);
      return state;
  }
  return state;
}

export default reducer
