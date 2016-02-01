"use strict"

import React from 'react'
import { connect } from 'react-redux'
import { Grid } from './Grid.jsx'

export class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Grid
          currentGrid={this.props.currentGrid}
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
