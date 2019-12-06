import React from 'react'

function NextPlayer (props) {
  let {currentStep} = props
  let players = ['將', '帥']
  
  return (
    <div className="next-player">
      <h4>下一步：</h4>
      <div className="wrap">
        {
          players.map((playerName, index) => {
            let color = index === 0 ? '#242223' : '#9a1f00'
            // 设置当前玩家的样式
            let playerClassName = ''
            if (currentStep % 2 === index) {
              playerClassName += 'current-player'
            }
            return (
              <div
                key={index}
                style={{
                  color: color
                }}
                className={playerClassName}
              >{playerName}</div>
            )
          })
        }
      </div>
    </div>
  )
}

export default NextPlayer