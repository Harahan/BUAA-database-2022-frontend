import React from 'react'
import "./post.css";
import { UserOutlined } from '@ant-design/icons';
import { Badge, Avatar, Button, Tag, Image } from 'antd';
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'

export default function Post ( { authorName, releaseTime, categories, title, digest, image, userPhoto } ) {
    return (
        <div className="post">
            <div className="postInfo">
                <div className="authorInfo">
                    <div className="profilePhoto">
                        <Badge count={ 1 } className="AuthorProfile">
                            <Avatar size='large' src={ userPhoto } />
                        </Badge>
                    </div>
                    <div className="authorName">
                        <p>{ authorName }</p>
                    </div>
                    <div className="followButton">
                        <Button type="dashed">Follow</Button>
                    </div>
                    <div className="postTime">
                        { releaseTime }
                    </div>
                </div>
                <div className="postCategories">
                    {
                        categories.map(
                            ( category, key ) => {
                                return (
                                    <Tag color="default" className="postCategory">{ category }</Tag>
                                );
                            }
                        )
                    }
                </div>
                <div className="postTitle">
                    { title }
                </div>
            </div>
            <div className="postDigest">
                { digest }
            </div>
            <img className="postImg" src={ image } alt="" />
        </div>
    )
}
