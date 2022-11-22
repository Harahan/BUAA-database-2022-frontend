import React from 'react'
import { useContext } from 'react';
import './message.css'
import { UserContext } from '../UserContext/UserContext'

function Message ( props, ref ) {
    const { data } = useContext( UserContext );
    return (
        <div className={ ( props.sender === 1 ) ? "Message" : "Message Own" } >
            <div className="msgInfo">
                <img
                    className='profilePic'
                    rel="noreferrer"
                    alt="none"
                    src={ ( props.sender === 1 ) ? props.avatar : data.info.avatar }
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