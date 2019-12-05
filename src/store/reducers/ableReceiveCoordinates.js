import * as actionTypes from '../actions/actionTypes'

function ableReceiveCoordinates (state = [], action) {
  switch (action.type) {
    case actionTypes.SET_ABLE_RECEIVE_COORDINATES:
      return action.ableReceiveCoordinates
    default:
      return state
  }
}

export default ableReceiveCoordinates