import React from 'react'

const Card = (props) => {
  return (
    <>
        <div className="card text-success bg-white p-3">
            <div className="card-body">
                <h1 className="card-title">{props.value}</h1>
            </div>
        </div>
    </>
  )
}

export default Card