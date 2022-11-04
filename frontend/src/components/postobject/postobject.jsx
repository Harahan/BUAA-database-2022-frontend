import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Comment, Avatar } from 'antd'
import './postobject.css'


export default function Postobject ( { authorName, releaseTime, categories, title, content, image } ) {
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
                <img className="postImg" src={ image } alt="" />
                <h1 className='postTitle'>{ title }</h1>
                <div className="editBar">
                    <div className="authorName">
                        <p>{ authorName }</p>
                    </div>
                    <div className="followButton">
                        <Button type="dashed">Follow</Button>
                    </div>
                    <Button className="editButton" icon={ <EditOutlined /> } />
                    <Button className="deleteButton" icon={ <DeleteOutlined /> } />
                    <div className="postTime">
                        { releaseTime }
                    </div>
                </div>
                <div className="postContent">
                    <p>
                        { content }
                    </p>
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
