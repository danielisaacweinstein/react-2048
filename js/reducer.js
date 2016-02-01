import * as Immutable from 'immutable'

function setInitialState(state, incomingData) {
  let initialState = Immutable.fromJS({
    currentGrid: [
      [2, , , ,],
      [ , ,2, ,],
      [ , , , ,],
      [ ,4, , ,]
    ]
  });

  return state.merge(initialState)
}


export default function reducer(state = Immutable.Map(), action) {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return setInitialState(state, action.data);
  }
  return state;
}
