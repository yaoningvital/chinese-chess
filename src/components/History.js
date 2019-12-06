import React from 'react'

function History (props) {
  let {currentStep, history, backTo} = props
  return (
    <React.Fragment>
      {
        history.length > 1 &&
        <div className="history">
          <h4>历史步骤：（当前第 {currentStep} 步）</h4>
          <div className="wrap">
            {
              history.map((stepItem, stepNum) => {
                let desc = stepNum ? `回退到第 ${stepNum} 步` : '重新开始游戏'
                return (
                  <button
                    key={stepNum}
                    onClick={() => backTo(stepNum, history)}
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