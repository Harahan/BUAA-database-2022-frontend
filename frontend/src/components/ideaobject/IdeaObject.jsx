import React from 'react'
import './IdeaObject.css'
import { useNavigate } from 'react-router-dom'
function IdeaObject(props, ref) {
    const navigate = useNavigate()
    const clickIdea = () => {
        navigate("/singleidea/", {
            state: {
                idea: props
            }
        })
    }
    return (
        <div className="idea">
            <div className="userInfo">
                <div className="userAvatar">
                    <img
                        className='profilePic'
                        rel="noreferrer"
                        alt="none"
                        src={props.avatar}
                    />
                    <h1 className='userName'>{props.username}</h1>
                </div>
                <p>{props.time}</p>
            </div>
            <div className="ideaContent" onClick={clickIdea}>
                <p>{props.content}</p>
            </div>
        </div>
    )
}

export default IdeaObject