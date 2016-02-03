"use strict"

import React from 'react'
import { Cell } from './Cell.jsx'

export class Grid extends React.Component {

  getGrid() {
    var currentGrid = this.props.currentGrid;

    var table = (
      <table className="table">
        <tbody>
        {
          currentGrid.map(function(row, rowIndex) {
            return (
              <tr key={rowIndex}>
                {row.map(function(cell, cellIndex) {
                  var cellContent = currentGrid.getIn([rowIndex, cellIndex])
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
      <div className="grid">
        {this.getGrid()}
      </div>
    )
  }
}
