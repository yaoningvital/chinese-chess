import { combineReducers } from 'redux'
import diameters from './diameters'
import selectedChessCoordinate from './selectedChessCoordinate'
import currentStep from './currentStep'
import history from './history'
import ableReceiveCoordinates from './ableReceiveCoordinates'
import lostPieces from './lostPieces'

export default combineReducers({
  diameters,
  selectedChessCoordinate,
  currentStep,
  history,
  ableReceiveCoordinates,
  lostPieces
})