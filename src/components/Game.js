import React from 'react'
import Board from './Board'
import { connect } from 'react-redux'
import SetBoardSize from './SetBoardSize'
import { setChessD, setSquareD } from '../store/actions/diameters'

function Game (props) {
  let {D, d, setD, setd} = props
  return (
    <div className="game">
      <div className="board-area">
        <Board
          D={D}
          d={d}
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

function setD (dispatch, e) {
  if (e.keyCode === 13) {
    dispatch(setSquareD(+e.target.value.trim()))
  }
}

function setd (dispatch, e) {
  if (e.keyCode === 13) {
    dispatch(setChessD(+e.target.value.trim()))
  }
}

const mapStateToProps = state => {
  return {
    D: state.diameters.D,
    d: state.diameters.d,
  }
}

const mapDispatchToProps = dispatch => ({
  setD: (e) => setD(dispatch, e),
  setd: (e) => setd(dispatch, e),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)