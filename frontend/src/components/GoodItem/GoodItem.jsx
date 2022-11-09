import React from 'react'

function GoodItem({ image, name, price }) {
    let imageSrc = "data:image/png;base64," + image.toString();
    let img = imageSrc.replace(/\s/g, encodeURIComponent(' '))
    return (
        <div className="goodItem">
            <div style={{ backgroundImage: `url('${img}')` }}> </div>
            <h1> {name} </h1>
            <p> ¥{price} </p >
        </div>
    )
}

export default GoodItem