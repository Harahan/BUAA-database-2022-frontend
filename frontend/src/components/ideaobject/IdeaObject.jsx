import React from 'react'
import Response from '../Response/Response'
import './IdeaObject.css'
import { useNavigate } from 'react-router-dom'
import AccountProfile from '../../pages/profile/other-profile';
function IdeaObject ( props ) {
    const navigate = useNavigate()

    const clickIdea = () => {
        navigate( "/singleidea/", {
            state: {
                idea: props
            }
        } )
    }

    return (
        <div className="idea">
            <div className="ideaLine">
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
                <div className="ideaContent" onClick={ clickIdea }>
                    <p>{ props.content }</p>
                </div>
            </div>
            <Response
                stance={ props.stance }
                tot_like={ props.tot_like }
                tot_dislike={ props.tot_dislike }
                tot_comment={ props.tot_comment }
                type={ 0 }
                id={ props.id }
            />
        </div>
    )
}

export default IdeaObject