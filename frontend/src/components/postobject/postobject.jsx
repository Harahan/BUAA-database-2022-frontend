import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Comment, Avatar, message } from 'antd'
import './postobject.css'


export default function Postobject({ authorName, releaseTime, categories, title, content, image }) {
    const handleFollow = () => {
        console.log("click")
        let data = { username: authorName }
        console.log(data)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: authorName
            }),
        };
        fetch("/api/follow", requestOptions)
            .then((response) => {
                if (response.ok) {
                    message.success('This is a success message');
                } else {
                    message.error('This is an error message');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleDelete = () => {
        console.log("delete")
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: authorName,
                tit: title
            }),
        };
        fetch("/api/deleteArticle", requestOptions)
            .then((response) => {
                if (response.ok) {
                    window.location.href = "/profile";
                } else {
                    message.error('you cannt delete');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const ExampleComment = ({ children }) => (
        <Comment
            actions={[<span key="comment-nested-reply-to">Reply to</span>]}
            author={<a>Han Solo</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure).
                </p>
            }
        >
            {children}
        </Comment>
    );

    return (
        <div className="postObject">
            <div className="postPadding">
                <img className="postImg" src={image} alt="" />
                <h1 className='postTitle'>{title}</h1>
                <div className="editBar">
                    <div className="authorName">
                        <p>{authorName}</p>
                    </div>
                    <div className="followButton" onClick={handleFollow}>
                        <Button type="dashed">Follow</Button>
                    </div>
                    <Button className="editButton" icon={<EditOutlined />} />
                    <Button className="deleteButton" icon={<DeleteOutlined />} onClick={handleDelete} />
                    <div className="postTime">
                        {releaseTime}
                    </div>
                </div>
                <div className="postContent">
                    <p>
                        {content}
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
