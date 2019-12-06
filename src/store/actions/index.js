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

export function updateSelectedChessCoordinate (selectedChessCoordinate) {
  return {
    type: actionTypes.UPDATE_SELECTED_CHESS_COORDINATE,
    selectedChessCoordinate
  }
}

export function setAbleReceiveCoordinates (ableReceiveCoordinates) {
  return {
    type: actionTypes.SET_ABLE_RECEIVE_COORDINATES,
    ableReceiveCoordinates
  }
}

export function setCurrentStep (currentStep) {
  return {
    type: actionTypes.SET_CURRENT_STEP,
    currentStep
  }
}

export function setHistory (history) {
  return {
    type: actionTypes.SET_HISTORY,
    history
  }
}