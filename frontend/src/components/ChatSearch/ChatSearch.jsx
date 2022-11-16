import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Input, notification } from 'antd';
import { ChatContext } from '../ChatContext/ChatContext';
import "./chatSearch.css"
import { useContext } from 'react';

const { Search } = Input;

const allContacts = [
    {
        username: "first1111",
        latest: "hi",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "1111",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "1111",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },

    {
        username: "111fd1",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1eeeee",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "1111",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "1111",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "1111",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },

    {
        username: "111fd1",
        latest: "hi",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",

        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",

        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",

        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",

        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",

        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",

        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1eeeee",

        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",

        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "111fd1",

        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
    {
        username: "last",

        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
    },
]


function ChatSearch () {
    const [ singleUser, setSingleUser ] = useState( allContacts[ 0 ] );
    const [ allUsers, setAllUsers ] = useState( allContacts );
    const { dispatch } = useContext( ChatContext );

    const onSearch = ( value ) => {
        console.log( value );
        axios(
            {
                url: "http://localhost:3000/api/finduser",
                method: "GET",
                prams: {
                    "userName": value
                }
            }
        ).then( res => {
            setSingleUser( res );
        } ).catch(
            err => {
                console.log( err );
                console.log( value );
                notification[ 'error' ]( {
                    message: 'Error finding User',
                    description: value + " not found"
                } );
            }
        )
    };

    const onSelect = ( user ) => {
        dispatch( { type: "change", payload: user } )
        setSingleUser( user );
        setAllUsers( allUsers.filter( item => item.username != user.username ) );
        setAllUsers( [ user, ...allUsers ] );
    };

    return (
        <div className="ChatSearch">
            <div className="searchForm">
                <Search
                    placeholder="Find a user"
                    onSearch={ onSearch }
                    allowClear={ true }
                    bordered={ false }
                    style={ {
                        width: 260,
                        backgroundColor: '#ECEBEB',
                    } }
                />
            </div>
            { singleUser &&
                // <div className="userChat" onClick={ onSelect( singleUser ) }>
                <div className="userChat" >
                    <img className="profilePic" src={ singleUser.avatar } alt="" />
                    <div className="chatUserInfo">
                        <div className="span">{ singleUser.username }</div>
                        <div className="latestMsg">
                            <div className="span">{ singleUser.latest }</div>
                        </div>
                    </div>
                </div>
            }
            <div className="contactForm">
                {
                    allContacts.map(
                        ( contact, key ) => {
                            return (
                                // <div className="userChat" onClick={ onSelect( contact ) }>
                                <div className="userChat" >
                                    <img className="profilePic" src={ contact.avatar } alt="" />
                                    <div className="chatUserInfo">
                                        <div className="span">{ contact.username }</div>
                                        <div className="latestMsg">
                                            <div className="span">{ contact.latest }</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )
                }
            </div>
        </div>
    )
}

export default ChatSearch