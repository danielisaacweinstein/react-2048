import * as Immutable from 'immutable'
import { getCollapsedGrid } from './collapseLogic.js'
import { getInitialConfiguration } from './gameflowLogic.js'

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
      return getCollapsedGrid(state, action.data);
  }
  return state;
}

export default reducer
