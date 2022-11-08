import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./post.css";
import { UserOutlined } from '@ant-design/icons';
import { Badge, Avatar, Button, Tag, Image, message } from 'antd';
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'
import SinglePost from '../../pages/postpage/postpage.jsx'
import Postpage from '../../pages/postpage/postpage.jsx';
import qs from 'qs'

export default function Post({ authorName, releaseTime, categories, title, digest, image, userPhoto }) {
    const handleFollow = () => {
        console.log("click")
        let data = { username: authorName }
        console.log(data)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify({
                username: authorName
            }),
        };
        fetch("/api/user/follow/", requestOptions)
        .then(res => res.json()).then(data => {
            if (data.code == 3) {
                alert('还未登录');
                window.location.href = "/login";
            } else if (data.code == 1) {
                message.success('取关成功');
            } else if (data.code == 2) {
                message.error('关注失败，请稍后尝试');
            } else if (data.code == 0) {
                message.success('关注成功');
            }else{
                message.error('无法关注自己');
            }
        })
        .catch((error) => {
            alert("关注失败")
            console.log(error);
        });
    }
    const navigate = useNavigate();
    const handleJump = () => {
        console.log("jump")
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify({
                author_Name: authorName,
                tit: title
            }),
        };
        let article = {
            authorName: "hhh",
            releaseTime: "long time ago",
            categories: [
                "item1",
                "item2",
                "item3"
            ],
            title: 'not found',
            content: "He owned up to her misdeeds. Rhaenys knew that a lot of people misunderstood Rhaenyra’s intentions and had formed a very different opinion. They saw her as the fierce Targaryen princess who wouldn’t mind spilling blood if it came to that. They saw her as a person who wouldn’t mind indulging in immoral activities and mocking the moral compass of society. But Rhaenyra was not the barbarian that people thought her to be. She was flamboyant in her approach, but she had a kind heart999999999999",
            image: rhaenyra_targaryen,
            userPhoto: rhaenyra_targaryen
        };
        fetch("/api/blog/fetchOne/", requestOptions)
        .then(res => res.json()).then(data => {
            console.log(data)
        })
        navigate('/postpage', { state: article, replace: true })
    }
    return (
        <div className="post" >
            <div className="postInfo">
                <div className="authorInfo">
                    <div className="profilePhoto">
                        <Badge count={1} className="AuthorProfile">
                            <Avatar size='large' src={userPhoto} />
                        </Badge>
                    </div>
                    <div className="authorName">
                        <p>{authorName}</p>
                    </div>
                    <div className="followButton">
                        <Button type="dashed" onClick={handleFollow}>Follow</Button>
                    </div>
                    <div className="postTime">
                        {releaseTime}
                    </div>
                </div>
                <div className="postCategories">
                    {
                        categories.map(
                            (category, key) => {
                                return (
                                    <Tag color="default" className="postCategory">{category}</Tag>
                                );
                            }
                        )
                    }
                </div>
                <div className="postTitle" onClick={handleJump}>
                    {title}
                </div>
            </div>
            <div className="postDigest" onClick={handleJump}>
                {digest}
            </div>
            <img className="postImg" src={image} alt="" />
        </div>
    )
}
