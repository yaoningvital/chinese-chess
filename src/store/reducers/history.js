import * as actionTypes from '../actions/actionTypes'
import { chessDefault } from '../../utils'

let initialLostPieces = [[], []] // 第一个数组中放“红方”被吃掉的子，第二个数组中放“黑方”被吃掉的子


const initialHistory = [
  {
    chesses: chessDefault,
    lostPieces: initialLostPieces
  }
]

function history (state = initialHistory, action) {
  switch (action.type) {
    case actionTypes.SET_HISTORY:
      return action.history
    default:
      return state
  }
}

export default history