import React from 'react'
import Board from './Board'
import { connect } from 'react-redux'
import SetBoardSize from './SetBoardSize'
import NextPlayer from './NextPlayer'
import History from './History'
import LostPieces from './LostPieces'
import {
  setAbleReceiveCoordinates,
  setChessD,
  setCurrentStep,
  setHistory,
  setLostPieces,
  setSquareD,
  updateSelectedChessCoordinate
} from '../store/actions'
import _ from 'lodash'
import downAudio from '../assets/audio/down.wav'
import clickAudio from '../assets/audio/click.wav'
import eatAudio from '../assets/audio/eat.mp3'
import jiangJunAudio from '../assets/audio/jiangjun.mp3'


function Game (props) {
  let {
    D, d, setD, setd, handleClickChess, selectedChessCoordinate, currentStep, history,
    ableReceiveCoordinates, moveChess, lostPieces
  } = props
  
  return (
    <div className="game">
      <div className="board-area">
        <Board
          D={D}
          d={d}
          handleClickChess={handleClickChess}
          selectedChessCoordinate={selectedChessCoordinate}
          currentStep={currentStep}
          history={history}
          ableReceiveCoordinates={ableReceiveCoordinates}
          moveChess={moveChess}
          lostPieces={lostPieces}
        />
      </div>
      <div className="btn-area">
        {/*  下一步*/}
        <NextPlayer currentStep={currentStep}/>
        {/*双方被吃掉的子*/}
        <LostPieces lostPieces={lostPieces}/>
        {/*  历史记录*/}
        <History
          history={history}
        />
        {/*设置棋盘和棋子大小*/}
        <SetBoardSize
          setD={setD}
          setd={setd}
        />
        {/*音频文件*/}
        <audio src={downAudio} id="down-audio"></audio>
        <audio src={clickAudio} id="click-audio"></audio>
        <audio src={eatAudio} id="eat-audio"></audio>
        <audio src={jiangJunAudio} id="jiang-jun-audio"></audio>
      </div>
    </div>
  )
}

/**
 * 设置棋盘格子宽度
 * @param dispatch
 * @param e
 */
function setD (dispatch, e) {
  if (e.keyCode === 13) {
    dispatch(setSquareD(+e.target.value.trim()))
  }
}

/**
 * 设置棋子宽度
 * @param dispatch
 * @param e
 */
function setd (dispatch, e) {
  if (e.keyCode === 13) {
    dispatch(setChessD(+e.target.value.trim()))
  }
}

/**
 * 处理点击一个棋子
 * @param dispatch
 * @param rowIndex
 * @param columnIndex
 * @param chessData
 */
function handleClickChess (dispatch, chessCoordinate, chessData, currentStep, history) {
  let nextSide = currentStep % 2 === 0 ? 1 : 0 // 当前玩家的 side
  if (chessData.side !== nextSide) return  // 只能点当前持方的棋子
  
  playClickChessAudio() // 播放选择一个棋子的声音
  
  let [rowIndex, columnIndex] = chessCoordinate
  // 1、改变被选中棋子的样式
  dispatch(updateSelectedChessCoordinate([rowIndex, columnIndex]))
  // 2、找落子点
  let ableReceiveCoordinates = getAbleReceiveSquares(dispatch, chessCoordinate, chessData, currentStep, history)
  dispatch(setAbleReceiveCoordinates(ableReceiveCoordinates))
}

/**
 * 返回当前选中棋子的落子点
 * @param dispatch
 * @param chessCoordinate : 当前选中棋子的坐标 [0,0]
 * @param chessData : 当前选中棋子的数据 {}
 * @param currentStep : 当前步骤
 * @param history : 当前历史步骤 数组
 */
function getAbleReceiveSquares (dispatch, chessCoordinate, chessData, currentStep, history) {
  let ableReceiveSquares = [] // 所有的落子点的坐标组成的数组 [[0,1],[1,2],...]
  let currentChesses = history[currentStep].chesses // 当前棋子布局
  let [currentRowIndex, currentColumnIndex] = chessCoordinate // 当前点击的棋子的坐标
  // 1、如果点击的是“兵”
  if (chessData.role === 'bing') {
    // 点击的是红色的“兵”
    if (chessData.side === 0) {
      if (currentRowIndex <= 4) { // 兵还没有过河
        for (let i = 4; i <= 5; i++) {
          for (let j = 0; j <= 8; j += 2) {
            if (i === currentRowIndex + 1 &&
              j === currentColumnIndex &&
              (
                currentChesses[i][j] === null ||   // 这个点为空
                currentChesses[i][j].side !== chessData.side  // 或者这个点上的棋子是 他方的棋子
              )
            ) { // 那么这个点是一个落子点
              ableReceiveSquares.push([i, j])
            }
          }
        }
      } else { // 兵已经过河
        for (let i = 5; i <= 9; i++) {
          for (let j = 0; j <= 8; j++) {
            if (
              (
                (i === currentRowIndex && Math.abs(j - currentColumnIndex) === 1) ||  // 与 点击的棋子 左右相邻的位置
                (i === currentRowIndex + 1 && j === currentColumnIndex) // 在 点击的棋子 前方的一个位置
              )
              &&
              (
                currentChesses[i][j] === null ||   // 这个点为空
                currentChesses[i][j].side !== chessData.side  // 或者这个点上的棋子是 他方的棋子
              )
            ) { // 那么这个点是一个落子点
              ableReceiveSquares.push([i, j])
            }
          }
        }
      }
      
    }
    // 点击的是黑色的“兵”
    else if (chessData.side === 1) {
      if (currentRowIndex >= 5) { // 兵还没有过河
        for (let i = 4; i <= 5; i++) {
          for (let j = 0; j <= 8; j += 2) {
            if (i === currentRowIndex - 1 &&
              j === currentColumnIndex &&  // 是它正前方的一个位置
              (
                currentChesses[i][j] === null ||   // 这个点为空
                currentChesses[i][j].side !== chessData.side  // 或者这个点上的棋子是 他方的棋子
              )
            ) { // 那么这个点是一个落子点
              ableReceiveSquares.push([i, j])
            }
          }
        }
      } else { // 兵已经过河
        for (let i = 0; i <= 4; i++) {
          for (let j = 0; j <= 8; j++) {
            if (
              (
                (i === currentRowIndex && Math.abs(j - currentColumnIndex) === 1) ||  // 与 点击的棋子 左右相邻的位置
                (i === currentRowIndex - 1 && j === currentColumnIndex) // 在 点击的棋子 前方的一个位置
              )
              &&
              (
                currentChesses[i][j] === null ||   // 这个点为空
                currentChesses[i][j].side !== chessData.side  // 或者这个点上的棋子是 他方的棋子
              )
            ) { // 那么这个点是一个落子点
              ableReceiveSquares.push([i, j])
            }
          }
        }
      }
    }
  }
  // 2、如果点击的是“炮”
  else if (chessData.role === 'pao') {
    let leftBridge = [] // 左边的桥点坐标
    let rightBridge = [] // 右边的桥点坐标
    let topBridge = [] // 上边的桥点坐标
    let bottomBridge = [] // 下边的桥点坐标
    // 找“炮”左边的 移落子点
    for (let j = currentColumnIndex - 1; j >= 0; j--) {
      if (currentChesses[currentRowIndex][j] === null) { // 向左移动一步，还在棋盘内 && 当前位置为空
        ableReceiveSquares.push([currentRowIndex, j])  // 那么这个点是 移落子点
      } else { // 向左移动一步的位置上，是一个棋子
        leftBridge = [currentRowIndex, j]
        break // 不用再往左边遍历了，再往左边的都不是 移落子点 了
      }
    }
    // 找“炮”右边的 移落子点
    for (let j = currentColumnIndex + 1; j <= 8; j++) {
      if (currentChesses[currentRowIndex][j] === null) { // 向右移动一步，还在棋盘内 && 当前位置为空
        ableReceiveSquares.push([currentRowIndex, j])  // 那么这个点是 移落子点
      } else { // 向右移动一步的位置上，是一个棋子
        rightBridge = [currentRowIndex, j]
        break // 不用再往右边遍历了，再往右边的都不是 移落子点 了
      }
    }
    // 找“炮”上边的 移落子点
    for (let i = currentRowIndex - 1; i >= 0; i--) {
      if (currentChesses[i][currentColumnIndex] === null) { // 向上移动一步的位置，为空
        ableReceiveSquares.push([i, currentColumnIndex]) // 那么这个点是 移落子点
      } else { // 向上移动一步的位置上，是一个棋子
        topBridge = [i, currentColumnIndex]
        break
      }
    }
    // 找“炮”下边的 移落子点
    for (let i = currentRowIndex + 1; i <= 9; i++) {
      if (currentChesses[i][currentColumnIndex] === null) { // 向下移动一步的位置，为空
        ableReceiveSquares.push([i, currentColumnIndex]) // 那么这个点是 移落子点
      } else { // 向下移动一步的位置上，是一个棋子
        bottomBridge = [i, currentColumnIndex]
        break
      }
    }
    
    // 找“炮”左边的 吃落子点
    if (leftBridge.length > 0) { // 如果有左边的桥点，才可能有左边的 吃落子点
      for (let j = leftBridge[1] - 1; j >= 0; j--) {
        if (currentChesses[currentRowIndex][j] !== null) { // 如果向左移动一步的位置，是一个棋子
          if (currentChesses[currentRowIndex][j].side !== chessData.side) {
            ableReceiveSquares.push([currentRowIndex, j])
          }
          break
        }
      }
    }
    // 找“炮”右边的 吃落子点
    if (rightBridge.length > 0) { // 如果有右边的桥点，才可能有右边的 吃落子点
      for (let j = rightBridge[1] + 1; j <= 8; j++) {
        if (currentChesses[currentRowIndex][j] !== null) { // 如果向右移动一步的位置，是一个棋子
          if (currentChesses[currentRowIndex][j].side !== chessData.side) {
            ableReceiveSquares.push([currentRowIndex, j])
          }
          break
        }
      }
    }
    // 找“炮”上边的 吃落子点
    if (topBridge.length > 0) { // 如果有上边的桥点，才可能有上边的 吃落子点
      for (let i = topBridge[0] - 1; i >= 0; i--) {
        if (currentChesses[i][currentColumnIndex] !== null) { // 如果向上移动一步的位置，是一个棋子
          if (currentChesses[i][currentColumnIndex].side !== chessData.side) {
            ableReceiveSquares.push([i, currentColumnIndex])
          }
          break
        }
      }
    }
    // 找“炮”下边的 吃落子点
    if (bottomBridge.length > 0) { // 如果有下边的桥点，才可能有下边的 吃落子点
      for (let i = bottomBridge[0] + 1; i <= 9; i++) {
        if (currentChesses[i][currentColumnIndex] !== null) { // 如果向下移动一步的位置，是一个棋子
          if (currentChesses[i][currentColumnIndex].side !== chessData.side) {
            ableReceiveSquares.push([i, currentColumnIndex])
          }
          break
        }
      }
    }
  }
  // 3、如果点击的是“车”
  else if (chessData.role === 'ju') {
    // 找“车”左边的 落子点
    for (let j = currentColumnIndex - 1; j >= 0; j--) {
      if (currentChesses[currentRowIndex][j] === null) { // 向左移动一步，还在棋盘内 && 当前位置为空
        ableReceiveSquares.push([currentRowIndex, j])  // 那么这个点是 移落子点
      } else { // 向左移动一步的位置上，是一个棋子
        if (currentChesses[currentRowIndex][j].side !== chessData.side) { // 是他方的棋子
          ableReceiveSquares.push([currentRowIndex, j])  // 那么这个点是 吃落子点
        }
        break // 不用再往左边遍历了，再往左边的都不是 落子点 了
      }
    }
    // 找“车”右边的 落子点
    for (let j = currentColumnIndex + 1; j <= 8; j++) {
      if (currentChesses[currentRowIndex][j] === null) { // 向右移动一步，还在棋盘内 && 当前位置为空
        ableReceiveSquares.push([currentRowIndex, j])  // 那么这个点是 移落子点
      } else { // 向右移动一步的位置上，是一个棋子
        if (currentChesses[currentRowIndex][j].side !== chessData.side) { // 是他方的棋子
          ableReceiveSquares.push([currentRowIndex, j])  // 那么这个点是 吃落子点
        }
        break // 不用再往右边遍历了，再往右边的都不是 落子点 了
      }
    }
    // 找“车”上边的 落子点
    for (let i = currentRowIndex - 1; i >= 0; i--) {
      if (currentChesses[i][currentColumnIndex] === null) { // 向上移动一步，还在棋盘内 && 当前位置为空
        ableReceiveSquares.push([i, currentColumnIndex])  // 那么这个点是 移落子点
      } else { // 向上移动一步的位置上，是一个棋子
        if (currentChesses[i][currentColumnIndex].side !== chessData.side) { // 是他方的棋子
          ableReceiveSquares.push([i, currentColumnIndex])  // 那么这个点是 吃落子点
        }
        break // 不用再往上边遍历了，再往上边的都不是 落子点 了
      }
    }
    // 找“车”下边的 落子点
    for (let i = currentRowIndex + 1; i <= 9; i++) {
      if (currentChesses[i][currentColumnIndex] === null) { // 向下移动一步，还在棋盘内 && 当前位置为空
        ableReceiveSquares.push([i, currentColumnIndex])  // 那么这个点是 移落子点
      } else { // 向下移动一步的位置上，是一个棋子
        if (currentChesses[i][currentColumnIndex].side !== chessData.side) { // 是他方的棋子
          ableReceiveSquares.push([i, currentColumnIndex])  // 那么这个点是 吃落子点
        }
        break // 不用再往下边遍历了，再往下边的都不是 落子点 了
      }
    }
  }
  // 4、如果点击的是“马”
  else if (chessData.role === 'ma') {
    let maybe = [] // 潜在的落子点位置 （最多8个）
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 8; j++) {
        let rowD = i - currentRowIndex
        let columnD = j - currentColumnIndex
        if (
          (Math.abs(rowD) === 2 && Math.abs(columnD) === 1) ||
          (Math.abs(rowD) === 1 && Math.abs(columnD) === 2)
        ) {
          maybe.push([i, j])
        }
      }
    }
    for (let maybeItem of maybe) {
      if (
        (maybeItem[0] - currentRowIndex === -2) &&  // 这个潜在落子点 是在这个“马”北边的两个潜在落子点之一
        currentChesses[currentRowIndex - 1][currentColumnIndex] === null && // 这个“马”的正上方一个点是空格
        (
          currentChesses[maybeItem[0]][maybeItem[1]] === null ||
          currentChesses[maybeItem[0]][maybeItem[1]].side !== chessData.side
        )
      ) { // 那么这个潜在落子点 是 真正的落子点
        ableReceiveSquares.push(maybeItem)
      }
      if (
        (maybeItem[1] - currentColumnIndex === -2) && // 这个潜在落子点 是在这个“马”西边的两个潜在落子点之一
        currentChesses[currentRowIndex][currentColumnIndex - 1] === null && // 这个“马”的左边一个点是空格
        (
          currentChesses[maybeItem[0]][maybeItem[1]] === null ||
          currentChesses[maybeItem[0]][maybeItem[1]].side !== chessData.side
        )
      ) { // 那么这个潜在落子点 是 真正的落子点
        ableReceiveSquares.push(maybeItem)
      }
      if (
        (maybeItem[0] - currentRowIndex === 2) &&  // 这个潜在落子点 是在这个“马”南边的两个潜在落子点之一
        currentChesses[currentRowIndex + 1][currentColumnIndex] === null && // 这个“马”的正下方一个点是空格
        (
          currentChesses[maybeItem[0]][maybeItem[1]] === null ||
          currentChesses[maybeItem[0]][maybeItem[1]].side !== chessData.side
        )
      ) { // 那么这个潜在落子点 是 真正的落子点
        ableReceiveSquares.push(maybeItem)
      }
      if (
        (maybeItem[1] - currentColumnIndex === 2) && // 这个潜在落子点 是在这个“马”东边的两个潜在落子点之一
        currentChesses[currentRowIndex][currentColumnIndex + 1] === null && // 这个“马”的右边一个点是空格
        (
          currentChesses[maybeItem[0]][maybeItem[1]] === null ||
          currentChesses[maybeItem[0]][maybeItem[1]].side !== chessData.side
        )
      ) { // 那么这个潜在落子点 是 真正的落子点
        ableReceiveSquares.push(maybeItem)
      }
    }
  }
  // 5、如果点击的是“相”
  else if (chessData.role === 'xiang') {
    // 点击的是红色的“相”
    if (chessData.side === 0) {
      for (let i = 0; i <= 4; i += 2) {
        for (let j = 0; j <= 8; j += 2) {
          if (i - currentRowIndex === -2 && j - currentColumnIndex === -2 &&  // 当前点的 左上角 的潜在落子点
            currentChesses[currentRowIndex - 1][currentColumnIndex - 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
          
          if (i - currentRowIndex === 2 && j - currentColumnIndex === -2 &&  // 当前点的 左下角 的潜在落子点
            currentChesses[currentRowIndex + 1][currentColumnIndex - 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
          
          if (i - currentRowIndex === -2 && j - currentColumnIndex === 2 &&  // 当前点的 右上角 的潜在落子点
            currentChesses[currentRowIndex - 1][currentColumnIndex + 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
          
          if (i - currentRowIndex === 2 && j - currentColumnIndex === 2 &&  // 当前点的 右下角 的潜在落子点
            currentChesses[currentRowIndex + 1][currentColumnIndex + 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
        }
      }
      
    }
    // 点击的是黑色的“相”
    else {
      for (let i = 5; i <= 9; i += 2) {
        for (let j = 0; j <= 8; j += 2) {
          if (i - currentRowIndex === -2 && j - currentColumnIndex === -2 &&  // 当前点的 左上角 的潜在落子点
            currentChesses[currentRowIndex - 1][currentColumnIndex - 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
          
          if (i - currentRowIndex === 2 && j - currentColumnIndex === -2 &&  // 当前点的 左下角 的潜在落子点
            currentChesses[currentRowIndex + 1][currentColumnIndex - 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
          
          if (i - currentRowIndex === -2 && j - currentColumnIndex === 2 &&  // 当前点的 右上角 的潜在落子点
            currentChesses[currentRowIndex - 1][currentColumnIndex + 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
          
          if (i - currentRowIndex === 2 && j - currentColumnIndex === 2 &&  // 当前点的 右下角 的潜在落子点
            currentChesses[currentRowIndex + 1][currentColumnIndex + 1] === null &&  // 这个“田”的中心点为空格
            (
              currentChesses[i][j] === null ||  // 这个潜在落子点的位置为空
              currentChesses[i][j].side !== chessData.side  // 这个位置的棋子为他方棋子
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
        }
      }
    }
  }
  // 6、如果点击的是“士”
  else if (chessData.role === 'shi') {
    // 点击的是红色的“士”
    if (chessData.side === 0) {
      for (let i = 0; i <= 2; i++) {
        for (let j = 3; j <= 5; j++) {
          if (
            Math.abs(i - currentRowIndex) === 1 &&
            Math.abs(j - currentColumnIndex) === 1 &&
            (
              currentChesses[i][j] === null ||
              currentChesses[i][j].side !== chessData.side
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
        }
      }
    }
    // 点击的是黑色的“士”
    else {
      for (let i = 7; i <= 9; i++) {
        for (let j = 3; j <= 5; j++) {
          if (
            Math.abs(i - currentRowIndex) === 1 &&
            Math.abs(j - currentColumnIndex) === 1 &&
            (
              currentChesses[i][j] === null ||
              currentChesses[i][j].side !== chessData.side
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
        }
      }
    }
  }
  // 7、如果点击的是“将”
  else if (chessData.role === 'jiang') {
    // 点击的是红色的“将”
    if (chessData.side === 0) {
      for (let i = 0; i <= 2; i++) {
        for (let j = 3; j <= 5; j++) {
          if (
            (
              (Math.abs(i - currentRowIndex) === 1 && j === currentColumnIndex) ||
              (Math.abs(j - currentColumnIndex) === 1 && i === currentRowIndex)
            ) &&
            (
              currentChesses[i][j] === null ||
              currentChesses[i][j].side !== chessData.side
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
        }
      }
    }
    // 点击的是黑色的“将”
    else {
      for (let i = 7; i <= 9; i++) {
        for (let j = 3; j <= 5; j++) {
          if (
            (
              (Math.abs(i - currentRowIndex) === 1 && j === currentColumnIndex) ||
              (Math.abs(j - currentColumnIndex) === 1 && i === currentRowIndex)
            ) &&
            (
              currentChesses[i][j] === null ||
              currentChesses[i][j].side !== chessData.side
            )
          ) {
            ableReceiveSquares.push([i, j])
          }
        }
      }
    }
  }
  return ableReceiveSquares
}


function moveChess (dispatch, isAbleReceive, currentStep, history, selectedChessCoordinate, dropGuyCoordinate, lostPieces) {
  
  if (isAbleReceive) { // 如果这个格子是一个落子点
    let [dragGuyX, dragGuyY] = selectedChessCoordinate // 当前要移动的那个棋子的坐标
    let [dropGuyX, dropGuyY] = dropGuyCoordinate // 要放到的格子的坐标
    
    let chesses = _.cloneDeep(history[currentStep].chesses)  // 当前棋子布局
    let dragGuyData = _.cloneDeep(chesses[dragGuyX][dragGuyY]) // 要移动的那个棋子的数据
    // 1、原来的位置 置为 空格
    chesses[dragGuyX][dragGuyY] = null
    // 2、新位置上如果有棋子，那么这个就被吃掉了。把被吃掉的棋子放到 lostPieces 中
    if (chesses[dropGuyX][dropGuyY]) {
      playEatAudio()
      
      let lost = _.cloneDeep(chesses[dropGuyX][dropGuyY])
      lostPieces[lost.side].push(lost)
    } else {
      playDownAudio()
    }
    // 3、把棋子放到新位置上
    chesses[dropGuyX][dropGuyY] = dragGuyData // 要放入的位置 放入 之前的要移动的那个棋子
    
    let new_history = _.cloneDeep(history).slice(0, currentStep + 1)
    new_history.push({chesses: chesses})
    
    dispatch(setAbleReceiveCoordinates([]))
    dispatch(setCurrentStep(currentStep + 1))
    dispatch(setHistory(new_history))
    dispatch(updateSelectedChessCoordinate([]))
    dispatch(setLostPieces(lostPieces))
    
    // 4、判断当前有没有 将对方的军
  }
}

/**
 * 播放落子的声音
 */
function playDownAudio () {
  let downAudio = document.getElementById('down-audio')
  downAudio.play()
}

/**
 * 播放点击棋子的声音
 */
function playClickChessAudio () {
  let clickAudio = document.getElementById('click-audio')
  clickAudio.play()
}

/**
 * 播放吃掉一个棋子的声音
 */
function playEatAudio () {
  let eatAudio = document.getElementById('eat-audio')
  eatAudio.play()
}

/**
 * 播放将军的声音
 */
function playJiangJunAudio () {
  let jiangJunAudio = document.getElementById('jiang-jun-audio')
  jiangJunAudio.play()
}

const mapStateToProps = state => {
  return {
    D: state.diameters.D,
    d: state.diameters.d,
    selectedChessCoordinate: state.selectedChessCoordinate,
    currentStep: state.currentStep,
    history: state.history,
    ableReceiveCoordinates: state.ableReceiveCoordinates,
    lostPieces: state.lostPieces,
  }
}

const mapDispatchToProps = dispatch => ({
  setD: (e) => setD(dispatch, e),
  setd: (e) => setd(dispatch, e),
  handleClickChess: (chessCoordinate, chessData, currentStep, history) => handleClickChess(dispatch, chessCoordinate, chessData, currentStep, history),
  moveChess: (isAbleReceive, currentStep, history, selectedChessCoordinate, dropGuyCoordinate, lostPieces) => moveChess(dispatch, isAbleReceive, currentStep, history, selectedChessCoordinate, dropGuyCoordinate, lostPieces)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)