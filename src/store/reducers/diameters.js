import * as actionTypes from '../actions/actionTypes'

const initialState = {
  D: 80, // 棋盘一个格子的宽度
  d: 70, // 棋子的直径
}

function diameters (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SQUARE_D:
      return {...state, D: action.D}
    case actionTypes.SET_CHESS_D:
      return {...state, d: action.d}
    default:
      return state
  }
}

export default diameters