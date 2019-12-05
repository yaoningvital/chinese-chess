import React from 'react'
import Chess from './Chess'

function Square (props) {
  let {
    D, d, rowIndex, columnIndex, chessData, handleClickChess, selectedChessCoordinate, currentStep, history,
    isAbleReceive
  } = props
  
  // 设置 落子点 样式
  let squarePosition = 'static'
  if (isAbleReceive) {
    squarePosition = 'relative'
  }
  
  return (
    <div
      className="square"
      style={{
        width: `${D}px`,
        height: `${D}px`,
        position: squarePosition
      }}
    >
      {
        chessData &&
        <Chess
          d={d}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          data={chessData}
          handleClickChess={handleClickChess}
          selectedChessCoordinate={selectedChessCoordinate}
          currentStep={currentStep}
          history={history}
        />
      }
      {
        isAbleReceive &&
        <div style={{
          width: '16px',
          height: '16px',
          borderRadius: '8px',
          background: 'rgba(0,255,0,0.3)',
          position: 'absolute',
          top: `${D / 2 - 8}px`,
          left: `${D / 2 - 8}px`,
          zIndex: 1
        }}/>
      }
    </div>
  )
}

export default Square