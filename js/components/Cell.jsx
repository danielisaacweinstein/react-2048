"use strict"

import React from 'react'

export class Cell extends React.Component {
  render() {
    return (
      <td>
        {this.props.contents ? this.props.contents : " - "}
      </td>
    )
  }

}
