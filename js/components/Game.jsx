"use strict"

import React from 'react'
import { connect } from 'react-redux'
import { Grid } from './Grid.jsx'
import { ControlPanel } from './ControlPanel.jsx'
import { shift, setInitialState } from '../actions.js'

export class Game extends React.Component {
  componentWillMount() {
    document.onkeydown = ((e) => {
      this.props.dispatch(shift(e.keyCode));
    });
  }

  render() {
    return (
      <div className="game">
        <h1>2048</h1>
        <Grid
          currentGrid={this.props.currentGrid}
        />
        <ControlPanel
          
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentGrid: state.get('currentGrid')
  }
}

export const GameContainer = connect(mapStateToProps)(Game);