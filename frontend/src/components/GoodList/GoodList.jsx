import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer'
import GoodItem from "../../components/GoodItem/GoodItem"
import './goodlist.css'

function GoodList () {

    const [ data, setData ] = useState( [] );
    useEffect( () => {
        fetch( "/api/shop/fetchAll/" )
            .then( res => res.json() ).then( data => {
                console.log( data )
                setData( data );
            } )
    }, [] );

    return (
        <div className="GoodList">
            {
                data.map( ( goodItem, key ) => {
                    return (
                        <GoodItem
                            key={ key }
                            image={ goodItem.image }
                            name={ goodItem.name }
                            price={ goodItem.price }
                        />
                    );
                } )
            }
        </div>
    )
}

export default GoodList