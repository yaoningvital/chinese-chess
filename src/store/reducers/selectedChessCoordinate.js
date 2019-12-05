import * as actionTypes from '../actions/actionTypes'

export default function selectedChessCoordinate (state = [], action) {
  switch (action.type) {
    case actionTypes.UPDATE_SELECTED_CHESS_COORDINATE:
      return action.selectedChessCoordinate
    default:
      return state
  }
}