import React from 'react'
import chessBoardBgImg from '../assets/images/chess-board-bg.png'
import Square from './Square'
import { isOneOfAbleReceive } from '../utils'


function Board (props) {
  let {
    D, d, handleClickChess, selectedChessCoordinate, currentStep, history,
    ableReceiveCoordinates, moveChess
  } = props
  
  let currentChesses = history[currentStep].chesses
  
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
        currentChesses.map((rowData, rowIndex) => {
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
                      moveChess={moveChess}
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