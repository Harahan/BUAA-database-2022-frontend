import React from 'react'
import { useNavigate } from 'react-router-dom';

function GoodItem ( { image, name, price, id } ) {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log( id )
        navigate( `/product/${ id }` );
    };
    return (
        <div className="goodItem">
            <div
                style={ { backgroundImage: `url(${ image })` } }
                onClick={ handleClick }>
            </div>
            <h1> { name } </h1>
            <p> ¥{ price } </p >
        </div>
    )
}

export default GoodItem