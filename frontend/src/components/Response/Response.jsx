import React, { useState, createElement, useEffect } from 'react'
import { Tooltip } from 'antd'
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined, CommentOutlined } from '@ant-design/icons'
import qs from 'qs'

function Response ( props ) {
    const [ stance, setStance ] = useState( props.stance );
    const [ likes, setLikes ] = useState( props.tot_like );
    const [ dislikes, setDislikes ] = useState( props.tot_dislike );
    const likeIcon = createElement( stance === 1 ? LikeFilled : LikeOutlined );
    const dislikeIcon = createElement( stance === -1 ? DislikeFilled : DislikeOutlined );


    const takeStance = () => {
        console.log( "posting taking stance" )
        console.log( stance )
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify( {
                obj_type: props.type,
                obj_id: props.id,
                stance: stance
            } ),
        };
        fetch( "/api/response/takeStance/", requestOptions )
            .then( res => res.json() ).then( data => {
                console.log( data );
                setLikes( data.tot_like );
                setDislikes( data.tot_dislike );
            } )
    }


    useEffect( takeStance, [ stance, props.id, props.type ] );

    const like = async () => {
        setStance( ( stance === 1 ) ? 0 : 1 );
    }
    const dislike = async () => {
        setStance( ( stance === -1 ) ? 0 : -1 );
    }
    return (
        <div className="Response">
            <Tooltip className="like" key="comment-basic-like" title="Like">
                <span onClick={ like }>
                    { likeIcon }
                    <span className="comment-action">{ likes }</span>
                </span>
            </Tooltip>
            <Tooltip className="dislike" key="comment-basic-dislike" title="Dislike">
                <span onClick={ dislike }>
                    { dislikeIcon }
                    <span className="comment-action">{ dislikes }</span>
                </span>
            </Tooltip>
            <span onClick={ dislike }>
                <CommentOutlined />
                <span className="comment-action">{ props.tot_comment }</span>
            </span>
        </div>
    )
}

export default Response