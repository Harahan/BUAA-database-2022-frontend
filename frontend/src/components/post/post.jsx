import React from 'react'
import "./post.css";
import { UserOutlined } from '@ant-design/icons';
import { Badge, Avatar, Button, Tag } from 'antd';
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'

export default function Post () {
    return (
        <div className="post">
            <div className="postInfo">
                <div className="authorInfo">
                    <div className="profilePhoto">
                        <Badge count={ 1 } className="AuthorProfile">
                            <Avatar size='large' icon={ <UserOutlined /> } />
                        </Badge>
                    </div>
                    <div className="authorName">
                        <p>peaceminuczy</p>
                    </div>
                    <div className="followButton">
                        <Button type="dashed">Follow</Button>
                    </div>
                    <div className="postTime">
                        30 minutes ago
                    </div>
                </div>
                <div className="postCategories">
                    <Tag color="default" className="postCategory">TV</Tag>
                    <Tag color="default" className="postCategory">Politics</Tag>
                    <Tag color="default" className="postCategory">Politics</Tag>
                </div>
                <div className="postTitle">
                    Rhaenyra Targaryen ? Will She make a fine queen?
                </div>
            </div>
            <div className="postDigest">
                She owned up to her misdeeds. Rhaenys knew that a lot of people misunderstood Rhaenyra’s intentions and had formed a very different opinion. They saw her as the fierce Targaryen princess who wouldn’t mind spilling blood if it came to that. They saw her as a person who wouldn’t mind indulging in immoral activities and mocking the moral compass of society. But Rhaenyra was not the barbarian that people thought her to be. She was flamboyant in her approach, but she had a kind heart...
            </div>
            <img className="postImg" src={ rhaenyra_targaryen } alt="" />
        </div>
    )
}
