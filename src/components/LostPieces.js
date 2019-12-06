import React from 'react'

function LostPieces (props) {
  let {lostPieces} = props
  return (
    <React.Fragment>
      {
        (lostPieces[0].length > 0 || lostPieces[1].length > 0) &&
        <div className="lost-pieces">
          <h4>已经损失的棋子：</h4>
          <div className="wrap">
            {
              lostPieces.map((sideArr, sideIndex) => {
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