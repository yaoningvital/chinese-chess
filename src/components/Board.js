import React from 'react'
import chessBoardBgImg from '../assets/images/chess-board-bg.png'
import Square from './Square'
import { chessDefault } from '../utils'

function Board (props) {
  let {D, d} = props
  
  return (
    <div
      className="board"
      style={{
        width: `${D * 9}px`,
        height: `${D * 10}px`,
        backgroundImage: `url(${chessBoardBgImg})`,
        backgroundSize: `${D * 9}px ${D * 10}px`,
      }}
    >
      {
        chessDefault.map((rowData, rowIndex) => {
          return (
            <div
              key={rowIndex}
              className="board-row"
              style={{
                height: `${D}px`,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}
            >
              {
                rowData.map((chessData, columnIndex) => {
                  return (
                    <Square
                      key={columnIndex}
                      D={D}
                      d={d}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      chessData={chessData}
                    />
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Board