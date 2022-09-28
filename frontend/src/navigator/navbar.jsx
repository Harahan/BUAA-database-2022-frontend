import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Space, Avatar, Badge } from 'antd';
import "antd/dist/antd.css";
import React from 'react';
import "./navbar.css"

export default function Navbar () {
    return (
        <div className="navbar">
            <div className="LeftBox">
                <p>BUAA DATABASE</p>
            </div>
            <div className="MiddleBox">
                <ul className="tabs">
                    <li className="tabItem">HOME</li>
                    <li className="tabItem">FOLLOW</li>
                    <li className="tabItem">WRITE</li>
                </ul>
            </div>
            <div className="RightBox">
                <Badge count={ 1 } className="UserProfile">
                    <Avatar size='large' icon={ <UserOutlined /> } />
                </Badge>
                <SearchOutlined className="searchIcon" />
            </div>
        </div>
    )
}
