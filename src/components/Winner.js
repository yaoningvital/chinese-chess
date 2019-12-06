import React from 'react'
import { getWinner } from '../utils'

function Winner (props) {
  let {currentStep, history} = props
  let winner = getWinner(currentStep, history)
  
  return (
    <React.Fragment>
      {
        winner &&
        <div className="winner">
          <h4>赢家是：</h4>
          <div style={{
            color: winner === '將' ? '#242223' : '#9a1f00'
          }}>
            {winner}
          </div>
        </div>
      }
    </React.Fragment>
  
  )
}

export default Winner