"use strict"

import React from 'react'
import { Cell } from './Cell.jsx'

export class Grid extends React.Component {

  getGrid() {
    let currentGrid = this.props.currentGrid;

    let table = (
      <table>
        <tbody>
        {
          currentGrid.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  let cellContent = currentGrid.getIn([rowIndex, cellIndex])
                  return (
                    <Cell
                      key={cellIndex}
                      contents={cellContent}
                    />
                  );
                })}
              </tr>
            );
          })
        }
        </tbody>
      </table>
    )

    return table;
  }

  render() {
    return (
      <div>
        {this.getGrid()}
      </div>
    )
  }

}
