import * as actionTypes from '../actions/actionTypes'

const initialLostPieces = [[], []] // 第一个数组中放“红方”被吃掉的子，第二个数组中放“黑方”被吃掉的子

function lostPieces (state = initialLostPieces, action) {
  switch (action.type) {
    case actionTypes.SET_LOST_PIECES:
      return action.lostPieces.slice()
    default:
      return state
  }
}

export default lostPieces