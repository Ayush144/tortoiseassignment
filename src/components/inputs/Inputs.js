import React from 'react'

const Inputs = (props) => {
  return (
    <>
        <input
            type="text"
            className="form-control"
            placeholder="Type here..."
            value={props.answer}
            onChange={(e)=>{
                props.checkAnswer(e)
            }}
            disabled={!props.isActive}
        />
    </>
  )
}

export default Inputs