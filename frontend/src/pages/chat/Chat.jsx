import React from 'react'
import './chat.css'
import SideBar from '../../components/ChatSide/SideBar'
import ChatBox from '../../components/ChatBox/ChatBox';

function Chat () {
    return (
        <div className="Chat">
            <div className="ChatContainer">
                <SideBar />
                <ChatBox />
            </div>
        </div>
    )
}

export default Chat