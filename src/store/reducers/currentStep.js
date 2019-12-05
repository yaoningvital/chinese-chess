import * as actionTypes from '../actions/actionTypes'


function currentStep (state = 0, action) {
  switch (action.type) {
    case actionTypes.SET_CURRENT_STEP:
      return action.currentStep
    default:
      return state
  }
}

export default currentStep