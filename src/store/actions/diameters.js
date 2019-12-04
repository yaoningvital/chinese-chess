import * as actionTypes from './actionTypes'

export function setSquareD (D) {
  return {
    type: actionTypes.SET_SQUARE_D,
    D: D
  }
}

export function setChessD (d) {
  return {
    type: actionTypes.SET_CHESS_D,
    d: d
  }
}