"use strict"

import React from 'react'

export class Cell extends React.Component {
  render() {
    var colorMap = {
      2: '#ECF2E6',
      4: '#DBE9D0',
      6: '#D2E3C4',
      8: '#C2D5B3',
      16: '#C7F2A5',
      32: '#9BDBD9',
      64: '#92CBC9',
      128: '#92A3CB',
      256: '#D179E5',
      512: '#D001FF',
      1024: '#FF01AF',
      2048: '#FF4D9E',
    }

    return (
      <td className="cell" style={{backgroundColor: colorMap[this.props.contents]}}>
        {this.props.contents}
      </td>
    )
  }
}
