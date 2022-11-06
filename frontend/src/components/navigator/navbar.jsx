import { PropertySafetyFilled, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Router } from 'react-router-dom';
import { Space, Avatar, Badge } from 'antd';
import "antd/dist/antd.css";
import React from 'react';
import "./navbar.css"
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'

export default function Navbar() {
    const [status, setStatus] = React.useState(false);
    React.useEffect(()=>{
        console.log('useEffect');
    },[])
    const handleClick = () => {
        if (!status) {
            window.location.href = "/login";
        } else {
            window.location.href = "/profile";
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
            <div className="RightBox" onClick={() => handleClick()}>
                <Badge count={1} className="UserProfile">
                    {/* 没有登陆是这个： */}
                    {status ? <Avatar size='large' src={rhaenyra_targaryen} /> :
                        <Avatar size='large' icon={<UserOutlined />} />}
                    {/* 登陆了是这个：
                    <Avatar size='large' src={ userPhoto } /> */}
                </Badge>
                <SearchOutlined className="searchIcon" />
            </div>
        </div>
    )
}
