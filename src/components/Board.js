import React from 'react'
import chessBoardBgImg from '../assets/images/chess-board-bg.png'
import Square from './Square'
import { chessDefault, isOneOfAbleReceive } from '../utils'


function Board (props) {
  let {
    D, d, handleClickChess, selectedChessCoordinate, currentStep, history,
    ableReceiveCoordinates
  } = props
  
  
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
                  let isAbleReceive = isOneOfAbleReceive(ableReceiveCoordinates, rowIndex, columnIndex)
                  
                  return (
                    <Square
                      key={columnIndex}
                      D={D}
                      d={d}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      chessData={chessData}
                      handleClickChess={handleClickChess}
                      selectedChessCoordinate={selectedChessCoordinate}
                      currentStep={currentStep}
                      history={history}
                      isAbleReceive={isAbleReceive}
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