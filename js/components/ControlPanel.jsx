"use strict"

import React from 'react'
import classNames from 'classnames'
import { Score } from './Score.jsx'
import { PlayButton } from './PlayButton.jsx'

export class ControlPanel extends React.Component {
  render() {
    return (
      <div className="control">
        <Score
        />
        <PlayButton
        />
      </div>
    );
  }
}
