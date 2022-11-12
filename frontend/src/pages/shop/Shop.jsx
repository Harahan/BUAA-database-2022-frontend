import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer'
import GoodItem from "../../components/GoodItem/GoodItem"
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'
import "./shop.css"

function Shop() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("/api/shop/fetchAll/")
            .then(res => res.json()).then(data => {
                console.log(data)
                setData(data);
            })
    }, []);

    return (
        <div className="shop">
            <h1 className='shopTitle'>Shop</h1>
            <div className="goodsList">
                {data.map((goodItem, key) => {
                    return (
                        <GoodItem
                            key={key}
                            image={goodItem.image}
                            name={goodItem.name}
                            price={goodItem.price}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default Shop