import React from 'react'
import ChatNav from '../ChatNav/ChatNav'
import ChatSearch from '../ChatSearch/ChatSearch'
import './sidebar.css'

const SideBar = () => {
    return (
        <div className="SideBar">
            <ChatNav />
            <ChatSearch />
        </div>
    )
}

export default SideBar