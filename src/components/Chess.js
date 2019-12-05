import React from 'react'
import chessBgImg from '../assets/images/chess-bg.png'

function Chess (props) {
  let {d, rowIndex, columnIndex, data, handleClickChess, selectedChessCoordinate, currentStep, history} = props
  let color = ''
  // 设置棋子显示的颜色
  if (data.side === 0) {
    color = '#9a1f00'
  } else if (data.side === 1) {
    color = '#242223'
  }
  
  // 设置棋子被点击之后(被选中)的状态
  let width = `${d}px`
  let height = `${d}px`
  let borderRadius = `${d / 2}px`
  let fontSize = `${d * 0.75}px`
  let backgroundSize = `${d}px ${d}px`
  let boxShadow = '0px 2px 4px 2px rgba(0, 0, 0, 0.4)'
  if (selectedChessCoordinate[0] === rowIndex && selectedChessCoordinate[1] === columnIndex) {
    width = `${d * 1.1}px`
    height = `${d * 1.1}px`
    borderRadius = `${d * 0.55}px`
    fontSize = `${d * 1.1 * 0.75}px`
    backgroundSize = `${d * 1.1}px ${d * 1.1}px`
    boxShadow = '0px 4px 6px 4px rgba(0, 0, 0, 0.5)'
  }
  return (
    <div
      className="chess"
      style={{
        position: 'relative',
        width: width,
        height: height,
        borderRadius: borderRadius,
        fontSize: fontSize,
        color: color,
        backgroundImage: `url(${chessBgImg})`,
        backgroundSize: backgroundSize,
        boxShadow: boxShadow
      }}
      onClick={() => handleClickChess([rowIndex, columnIndex], data, currentStep, history)}
    >
      {data.name}
    </div>
  )
}

export default Chess