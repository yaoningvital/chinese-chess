import React from 'react'

function History (props) {
  let {history} = props
  return (
    <React.Fragment>
      {
        history.length > 1 &&
        <div className="history">
          <h4>历史步骤：</h4>
          <div className="wrap">
            {
              history.map((stepItem, stepNum) => {
                let desc = stepNum ? `回退到第 ${stepNum} 步` : '重新开始游戏'
                return (
                  <button
                    key={stepNum}
                  >{desc}</button>
                )
              })
            }
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default History