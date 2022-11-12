import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer'
import GoodItem from "../../components/GoodItem/GoodItem"
import "./shop.css"
import GoodList from '../../components/GoodList/GoodList'

function Shop () {
    return (
        <div className="shop">
            <h1 className='shopTitle'>Shop</h1>
            <div className="goodsList">
                <GoodList />
            </div>
        </div>
    )
}

export default Shop