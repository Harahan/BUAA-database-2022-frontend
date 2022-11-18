import React, { createElement, useState } from 'react'
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined, CommentOutlined } from '@ant-design/icons'
import './IdeaObject.css'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'antd'
import { localeData } from 'moment'
import AccountProfile from '../../pages/profile/other-profile';
function IdeaObject ( props, ref ) {
    const [ action, setAction ] = useState( null );
    const navigate = useNavigate()
    const like = () => {
        setAction( action !== 'liked' ? 'liked' : 'neutral' );
    }
    const dislike = () => {
        setAction( action !== 'disliked' ? 'disliked' : 'neutral' );
    }
    const clickIdea = () => {
        navigate( "/singleidea/", {
            state: {
                idea: props
            }
        } )
    }
    const likeIcon = createElement( action === 'liked' ? LikeFilled : LikeOutlined );
    const dislikeIcon = createElement( action === 'disliked' ? DislikeFilled : DislikeOutlined );

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
            <div className="actions">
                <Tooltip className="like" key="comment-basic-like" title="Like">
                    <span onClick={ like }>
                        { likeIcon }
                        <span className="comment-action">{ props.tot_like }</span>
                    </span>
                </Tooltip>
                <Tooltip className="dislike" key="comment-basic-dislike" title="Dislike">
                    <span onClick={ dislike }>
                        { dislikeIcon }
                        <span className="comment-action">{ props.tot_dislike }</span>
                    </span>
                </Tooltip>
                <span onClick={ dislike }>
                    <CommentOutlined />
                    <span className="comment-action">{ props.tot_comment }</span>
                </span>
            </div>
        </div>
    )
}

export default IdeaObject