"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducer.js'
import { GameContainer } from './components/Game.jsx'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { setInitialState } from './actions.js'

const store = createStore(reducer);
store.dispatch(setInitialState());

ReactDOM.render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.getElementById('react')
)
