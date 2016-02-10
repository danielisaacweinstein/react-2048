"use strict"

import React from 'react'
import classNames from 'classnames'

export class Cell extends React.Component {
  render() {
    var num = this.props.contents;

    var cssStyling = classNames({
      'cell':     true,
      'cell2':    (num === 2),
      'cell4':    (num === 4),
      'cell8':    (num === 8),
      'cell16':   (num === 16),
      'cell32':   (num === 32),
      'cell64':   (num === 64),
      'cell128':  (num === 128),
      'cell256':  (num === 256),
      'cell512':  (num === 512),
      'cell1024': (num === 1024),
      'cell2048': (num === 2048)
    })

    return (
      <td className={cssStyling}>
        {this.props.contents}
      </td>
    )
  }
}
