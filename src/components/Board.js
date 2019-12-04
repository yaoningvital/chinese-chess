import React from 'react'
import chessBoardBgImg from '../assets/images/chess-board-bg.png'

function Board (props) {
  let {D,} = props
  return (
    <div
      className="board"
      style={{
        width: `${D * 9}px`,
        height: `${D * 10}px`,
        backgroundImage: `url(${chessBoardBgImg})`,
        backgroundSize: `${D * 9}px ${D * 10}px`
      }}
    >
    
    </div>
  )
}

export default Board