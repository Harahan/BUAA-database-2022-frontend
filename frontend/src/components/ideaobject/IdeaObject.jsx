import React from 'react'
import './IdeaObject.css'

function IdeaObject ( props, ref ) {
    return (
        <div className="idea">
            <div className="userInfo">
                <div className="userAvatar">
                    <img
                        className='profilePic'
                        rel="noreferrer"
                        alt="none"
                        src={ props.avatar }
                    />
                    <h1 className='userName'>{ props.username }</h1>
                </div>
                <p>{ props.time }</p>
            </div>
            <div className="ideaContent">
                <p>{ props.content }</p>
            </div>
        </div>
    )
}

export default IdeaObject