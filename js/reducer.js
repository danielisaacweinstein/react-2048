import * as Immutable from 'immutable'
import { getCollapsedGrid } from './collapseLogic.js'

function getInitialState(state) {
  var initialState = Immutable.fromJS({
    currentGrid: [
      [2,2,2,2,],
      [ , ,2, ,],
      [8, , ,8,],
      [ ,4, , ,]
    ]
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
