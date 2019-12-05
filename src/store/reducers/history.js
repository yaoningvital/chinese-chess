import * as actionTypes from '../actions/actionTypes'
import { chessDefault } from '../../utils'


const initialHistory = [
  {
    chesses: chessDefault
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