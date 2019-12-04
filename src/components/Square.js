import React from 'react'
import Chess from './Chess'

function Square (props) {
  let {D, d,rowIndex,columnIndex,chessData} = props
  return (
    <div
      className="square"
      style={{
        width: `${D}px`,
        height: `${D}px`,
      }}
    >
      {
        chessData &&
        <Chess
          d={d}
          data={chessData}
        />
      }
    </div>
  )
}

export default Square