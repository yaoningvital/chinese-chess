import React from 'react'

function SetBoardSize (props) {
  let {setD,setd} = props
  return (
    <div className="set-board-size">
      <h4>设置棋盘格子宽度&棋子宽度</h4>
      <div>
        <label>棋盘格子宽度(默认80px)：</label>
        <input type="number" onKeyUp={setD}/>
        <span> px</span>
      </div>
      <div>
        <label>棋子宽度(默认70px)：</label>
        <input type="number" onKeyUp={setd}/>
        <span> px</span>
      </div>
    </div>
  )
}

export default SetBoardSize