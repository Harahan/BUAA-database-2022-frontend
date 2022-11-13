import React, { useState } from 'react'
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
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify({
                authorName: authorName
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
                } else {
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
        var curname = null
        if (authorName.indexOf('#') != -1 || authorName.indexOf('+') != -1 || authorName.indexOf('/') != -1 || authorName.indexOf('?') != -1 || authorName.indexOf('%') != -1 || authorName.indexOf('&') != -1 || authorName.indexOf('=') != -1 || authorName.indexOf(' ') != -1) {
            curname = authorName.replace(/([\#|\+|\/|\?|\%|\#|\&|\=| ])/g, function ($1) {
                return encodeURIComponent($1)
            })
        } else {
            curname = authorName;
        }
        var curtit = null
        if (title.indexOf('#') != -1 || title.indexOf('+') != -1 || title.indexOf('/') != -1 || title.indexOf('?') != -1 || title.indexOf('%') != -1 || title.indexOf('&') != -1 || title.indexOf('=') != -1 || title.indexOf(' ') != -1) {
            curtit = title.replace(/([\#|\+|\/|\?|\%|\#|\&|\=| ])/g, function ($1) {
                return encodeURIComponent($1)
            })
        } else {
            curtit = title;
        }
        let url = "api/blog/fetchOne/?author_Name=" + curname + "&tit=" + curtit
        console.log(url)
        fetch(`api/blog/fetchOne/?author_Name=${authorName}&tit=${title}`).then(res => res.json()).then(data => {
            navigate('/postpage', { state: data[0] })
        })
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
