import React from 'react'

function GoodItem({ image, name, price }) {
    return (
        <div className="goodItem">
            <div style={{ backgroundImage: `url(${image})` }}></div>
            <h1> {name} </h1>
            <p> ¥{price} </p >
        </div>
    )
}

export default GoodItem