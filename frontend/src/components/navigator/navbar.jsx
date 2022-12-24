import { PropertySafetyFilled, SearchOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, Router } from 'react-router-dom';
import { Space, Avatar, Badge, message, Tooltip, Button } from 'antd';
import "antd/dist/antd.css";
import React from 'react';
import "./navbar.css"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../components/UserContext/UserContext'
import qs from "qs";
export default function Navbar () {
    const { data, dispatch } = useContext( UserContext );
    const navigate = useNavigate();
    useEffect( () => {
        console.log( "重新渲染navbar" )
        fetch( "/api/user/getProfile/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: qs.stringify( {
                username: data.info.username === null ? "" : data.info.username
            } )
        } ).then( res => res.json() ).then( data => {
            console.log( data )
            if ( data.code == 1 ) {
                dispatch( { type: "render", status: false, info: {} } )
            } else {
                dispatch( { type: "render", status: true, info: data } )
            }
        } )
    }, [] )
    const handleClick = () => {
        if ( !data.status ) {
            navigate( '/login' )
        } else {
            navigate( `/profile/${ data.info.username }` )
        }
    };
    const handleLogOut = () => {
        fetch( "/api/user/logout/" )
            .then( res => res.json() ).then( data => {
                if ( data.code === 1 ) {
                    message.error( '还未登录' );
                } else if ( data.code === 0 ) {
                    message.success( '退出成功' );
                    dispatch( { type: 'render', status: false, info: data } )
                    navigate( '/' )
                }
            } )
            .catch( ( error ) => {
                message.error( "退出失败" )
                console.log( error );
            } );
    }
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
                <div className="UserProfile">
                    { data.status ? <Avatar size='large' src={ data.info.avatar } onClick={ handleClick } /> :
                        <Avatar size='large' icon={ <UserOutlined /> } onClick={ handleClick } /> }
                </div>
                <div className="Logout">
                    <Tooltip title="log out" className="logout">
                        <Button danger
                            shape="circle"
                            size={ 'middle' }
                            icon={ <LogoutOutlined /> }
                            onClick={ handleLogOut } />
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}
