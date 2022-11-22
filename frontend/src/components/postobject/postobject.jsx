import React from 'react'
import { useEffect } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Comment, Avatar, message } from 'antd'
import './postobject.css'
import qs from 'qs'


export default function Postobject ( { authorName, releaseTime, categories, title, html, followed } ) {
    const handleFollow = () => {
        console.log( "click" )
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify( {
                authorName: authorName
            } ),
        };
        fetch( "/api/user/follow/", requestOptions )
            .then( res => res.json() ).then( data => {
                if ( data.code == 3 ) {
                    alert( '还未登录' );
                    window.location.href = "/login";
                } else if ( data.code == 1 ) {
                    message.success( '取关成功' );
                } else if ( data.code == 2 ) {
                    message.error( '关注失败，请稍后尝试' );
                } else if ( data.code == 0 ) {
                    message.success( '关注成功' );
                } else {
                    message.error( '无法关注自己' );
                }
            } )
            .catch( ( error ) => {
                alert( "关注失败" )
                console.log( error );
            } );
    }
    const handleDelete = () => {
        console.log( "delete" )
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify( {
                username: authorName,
                tit: title
            } ),
        };
        fetch( "/api/blog/delete/", requestOptions )
            .then( res => res.json() ).then( data => {
                if ( data.code == 3 ) {
                    alert( '还未登录或权限不足' );
                } else if ( data.code == 1 ) {
                    message.success( '文章不存在' );
                } else if ( data.code == 2 ) {
                    message.error( '删除失败，请稍后尝试' );
                } else if ( data.code == 0 ) {
                    message.success( '删除成功' );
                    window.location.href = "/home";
                }
            } )
    }
    const ExampleComment = ( { children } ) => (
        <Comment
            actions={ [ <span key="comment-nested-reply-to">Reply to</span> ] }
            author={ <a>Han Solo</a> }
            avatar={ <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" /> }
            content={
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure).
                </p>
            }
        >
            { children }
        </Comment>
    );

    return (
        <div className="postObject">
            <div className="postPadding">
                <h1 className='postTitle'>{ title }</h1>
                <div className="editBar">
                    <div className="authorName">
                        <p>{ authorName }</p>
                    </div>
                    <div className="followButton" onClick={ handleFollow }>
                        <Button type="dashed">{ followed ? "Unfollow" : "Follow" }</Button>
                    </div>
                    <Button className="editButton" icon={ <EditOutlined /> } />
                    <Button className="deleteButton" icon={ <DeleteOutlined /> } onClick={ handleDelete } />
                    <div className="postTime">
                        { releaseTime }
                    </div>
                </div>
                <div className="postContent">
                    <div className="editor-content-view"
                        dangerouslySetInnerHTML={ { __html: html === "" ? "null" : html } }
                    />
                </div>
                <ExampleComment>
                    <ExampleComment>
                        <ExampleComment />
                        <ExampleComment />
                    </ExampleComment>
                </ExampleComment>
            </div>
        </div>
    )
}
