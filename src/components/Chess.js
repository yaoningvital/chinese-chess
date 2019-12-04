import React from 'react'
import chessBgImg from '../assets/images/chess-bg.png'

function Chess (props) {
  let {d, data} = props
  let color = ''
  let textShadow = ''
  if (data.side === 0) {
    color = '#9a1f00'
    // textShadow=`-2px -2px 1px #8e1800, 2px 2px 1px #d4745c`
    textShadow = `-1px -1px 1px rgba(0,0,0,0.8), 1px 1px 1px rgba(255,255,255,0.8)`
  } else if (data.side === 1) {
    color = '#242223'
    // textShadow=`-2px -2px 1px #2b2a28, 2px 2px 1px #7d766e`
    textShadow = `-1px -1px 1px rgba(0,0,0,0.8), 1px 1px 1px rgba(255,255,255,0.8)`
  }
  return (
    <div
      className="chess"
      style={{
        width: `${d}px`,
        height: `${d}px`,
        borderRadius: `${d / 2}px`,
        fontSize: `${d * 0.75}px`,
        color: color,
        backgroundImage: `url(${chessBgImg})`,
        backgroundSize: `${d}px ${d}px`,
        textShadow: textShadow
      }}
    >
      {data.name}
    </div>
  )
}

export default Chess