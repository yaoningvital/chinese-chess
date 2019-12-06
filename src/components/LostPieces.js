import React from 'react'

function LostPieces (props) {
  let {currentStep, history} = props
  let currentLostPieces = history[currentStep].lostPieces
  return (
    <React.Fragment>
      {
        (currentLostPieces[0].length > 0 || currentLostPieces[1].length > 0) &&
        <div className="lost-pieces">
          <h4>已经损失的棋子：</h4>
          <div className="wrap">
            {
              currentLostPieces.map((sideArr, sideIndex) => {
                return (
                  <React.Fragment
                    key={sideIndex}
                  >
                    {
                      sideArr.length > 0 &&
                      <div
                        className="group"
                      >
                        {
                          sideArr.map((pieceData, pieceIndex) => {
                            let color = pieceData.side === 0 ? '#9a1f00' : '#242223'
                            return (
                              <div
                                key={pieceIndex}
                                style={{
                                  color: color
                                }}
                              >
                                {pieceData.name}
                              </div>
                            )
                          })
                        }
                      </div>
                    }
                  </React.Fragment>
                
                )
              })
            }
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default LostPieces