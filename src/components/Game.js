import React from 'react'
import Board from './Board'
import { connect } from 'react-redux'
import SetBoardSize from './SetBoardSize'
import { setAbleReceiveCoordinates, setChessD, setSquareD, updateSelectedChessCoordinate } from '../store/actions'

function Game (props) {
  let {
    D, d, setD, setd, handleClickChess, selectedChessCoordinate, currentStep, history,
    ableReceiveCoordinates
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
        />
      </div>
      <div className="btn-area">
        {/*设置棋盘和棋子大小*/}
        <SetBoardSize
          setD={setD}
          setd={setd}
        />
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
        for (let i = 0; i < currentChesses.length; i++) {
          for (let j = 0; j < currentChesses[i].length; j++) {
            if (i === currentRowIndex + 1 &&
              j === currentColumnIndex &&  // 棋盘中有这么一个点
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
        for (let i = 0; i < currentChesses.length; i++) {
          for (let j = 0; j < currentChesses[i].length; j++) {
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
        for (let i = 0; i < currentChesses.length; i++) {
          for (let j = 0; j < currentChesses[i].length; j++) {
            if (i === currentRowIndex - 1 &&
              j === currentColumnIndex &&  // 棋盘中有这么一个点
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
        for (let i = 0; i < currentChesses.length; i++) {
          for (let j = 0; j < currentChesses[i].length; j++) {
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
  
  return ableReceiveSquares
}

const mapStateToProps = state => {
  return {
    D: state.diameters.D,
    d: state.diameters.d,
    selectedChessCoordinate: state.selectedChessCoordinate,
    currentStep: state.currentStep,
    history: state.history,
    ableReceiveCoordinates: state.ableReceiveCoordinates,
  }
}

const mapDispatchToProps = dispatch => ({
  setD: (e) => setD(dispatch, e),
  setd: (e) => setd(dispatch, e),
  handleClickChess: (chessCoordinate, chessData, currentStep, history) => handleClickChess(dispatch, chessCoordinate, chessData, currentStep, history),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)