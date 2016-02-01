"use strict"

import React from 'react'

export class Cell extends React.Component {
  render() {
    return (
      <td className="cell">
        {this.props.contents}
      </td>
    )
  }
}
