import React from 'react'
import Timer from './Timer'

const StopWatch = (props) => {
  return (
    <>
        <div className="stop-watch">
            <div className="text-white p-3">
                <Timer time={props.time} />
            </div>
            <div className="text-white pb-5">
                my best time: <span className="time">{props.highScore / 1000}s!</span>
            </div>
        </div>
    </>
  )
}

export default StopWatch