import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GoodItem from "../../components/GoodItem/GoodItem"
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'
import "./shop.css"

function Shop() {
    const [data, setData] = useState({
        GoodsList: [
            {
                name: "Pepperoni Pizza",
                image: rhaenyra_targaryen,
                price: 15.99,
            },
            {
                name: "Margherita Pizza",
                image: rhaenyra_targaryen,
                price: 11.99,
            },
            {
                name: "PedroTech Special Pizza",
                image: rhaenyra_targaryen,
                price: 256.53,
            },
            {
                name: "Vegan Pizza",
                image: rhaenyra_targaryen,
                price: 17.99,
            },
            {
                name: "Pineapple Pizza",
                image: rhaenyra_targaryen,
                price: 4.99,
            },
            {
                name: "Very Expensive Pizza",
                image: rhaenyra_targaryen,
                price: 1997.99,
            },
        ]
    });
    useEffect(() => {
        fetch("/api/shop/fetchAll/")/*
        .then(res => {
            console.log(res)
            //setData(data);
        })*/
        .then(res => res.json()).then(data => {
            console.log(data)
            //setData(data);
        })
    }, []);

    return (
        <div className="shop">
            <h1 className='shopTitle'>Shop</h1>
            <div className="goodsList">
                {data.GoodsList.map((goodItem, key) => {
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