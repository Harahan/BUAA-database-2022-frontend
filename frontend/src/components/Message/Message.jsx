import React from 'react'
import { useContext } from 'react';
import './message.css'
import { ChatContext } from '../ChatContext/ChatContext.jsx'

function Message ( props, ref ) {
    const { data } = useContext( ChatContext );

    return (
        <div className={ ( props.sender === 1 ) ? "Message" : "Message Own" } >
            <div className="msgInfo">
                <img
                    className='profilePic'
                    rel="noreferrer"
                    alt="none"
                    src={ data.singleContact.avatar }
                />
                <span>{ props.time }</span>
            </div>
            <div className="msgContent">
                <div className="msg">{ props.content }</div>
            </div>
        </div >
    )
}

export default Message