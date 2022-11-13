import { PropertySafetyFilled, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Router } from 'react-router-dom';
import { Space, Avatar, Badge } from 'antd';
import "antd/dist/antd.css";
import React from 'react';
import "./navbar.css"
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../components/UserContext/UserContext'
export default function Navbar() {
    const { data, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("重新渲染navbar")
        fetch("/api/user/getProfile/")
            .then(res => res.json()).then(data => {
                if (data.code == 1) {
                    dispatch({ type: "render", status: false, info: {} })
                } else {
                    dispatch({ type: "render", status: true, info: data })
                }
            })
    }, [])
    const handleClick = () => {
        if (!data.status) {
            navigate('/login')
        } else {
            navigate('/profile')
        }
    };
    return (
        <div className="navbar" >
            <div className="LeftBox">
                <Link className="link" to="/">
                    <p>BUAA DATABASE</p>
                </Link>
            </div>
            <div className="MiddleBox">
                <ul className="tabs">
                    <li className="tabItem">
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className="tabItem">
                        <Link className="link" to="/follow">FOLLOW</Link>
                    </li>
                    <li className="tabItem">
                        <Link className="link" to="/write">WRITE</Link>
                    </li>
                    <li className="tabItem">
                        <Link className="link" to="/shop">SHOP</Link>
                    </li>
                    <li className="tabItem">
                        <Link className="link" to="/chat">CHAT</Link>
                    </li>
                </ul>
            </div>
            <div className="RightBox" >
                <Badge count={1} className="UserProfile">
                    {data.status ? <Avatar size='large' src={data.info.avatar} onClick={handleClick} /> :
                        <Avatar size='large' icon={<UserOutlined />} onClick={handleClick} />}
                </Badge>
                <SearchOutlined className="searchIcon" />
            </div>
        </div>
    )
}
