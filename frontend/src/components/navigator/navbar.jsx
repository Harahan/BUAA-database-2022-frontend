import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
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
                    <li className="tabItem">
                        <Link className="link" to="/">HOME</Link>
                    </li>
                    <li className="tabItem">
                        <Link className="link" to="/follow">FOLLOW</Link>
                    </li>
                    <li className="tabItem">
                        <Link className="link" to="/write">WRITE</Link>
                    </li>
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
