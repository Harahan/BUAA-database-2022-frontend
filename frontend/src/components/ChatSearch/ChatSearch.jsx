import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Input, notification } from 'antd';
import { ChatContext } from '../ChatContext/ChatContext';
import qs from 'qs'
import "./chatSearch.css"
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';

const { Search } = Input;


function ChatSearch () {
    const [ allUsers, setAllUsers ] = useState( [] );
    const { dispatch } = useContext( ChatContext );
    const { data } = useContext( UserContext );

    const getChats = () => {
        axios(
            {
                url: "http://localhost:3000/api/chat/getChats/",
                method: "GET",
                prams: {
                    "name": ""
                }
            }
        ).then( res => {
            let allContacts = res.data.map(
                val => {
                    let user = {};
                    user.id = val.id;
                    user.latest = val.latest;
                    user.key = val.key;
                    user.name = val.type === "group" ? val.name : val.owner;
                    user.owner = val.owner;
                    user.time = val.time;
                    user.type = val.type;
                    user.avatar = val.avatar;
                    if ( val.type === "private" ) {
                        let opp = val.users[ 0 ].username === data.info.username ?
                            val.users[ 1 ] : val.users[ 0 ];
                        console.log( opp );
                        user.avatar = opp.avatar;
                        user.name = opp.username;
                    }
                    return user
                }
            )
            setAllUsers( allContacts );
        } );
    }

    useEffect( () => {
        getChats()
    }, [] );

    const onSearch = ( value ) => {
        console.log( value );
        axios(
            {
                url: "http://localhost:3000/api/chat/getChats/",
                method: "GET",
                prams: {
                    "name": value
                }
            }
        ).then( res => {
            setAllUsers( res.data );
            console.log( res );
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
        let obj;
        allUsers.forEach( ( item, index ) => {
            if ( item.name === user.name ) {
                obj = item;
                allUsers.splice( index, 1 );
                return;
            }
        } )
        allUsers.unshift( obj )
        setAllUsers( allUsers );
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
                        backgroundColor: '#ECEBEB',
                    } }
                />
            </div>
            <div className="contactForm">
                {
                    allUsers.map(
                        ( contact, key ) => {
                            return (
                                // <div className="userChat" onClick={ onSelect( contact ) }>
                                <div className="userChat" onClick={ () => onSelect( contact ) }>
                                    <img className="profilePic" src={ contact.avatar } alt="" />
                                    <div className="chatUserInfo">
                                        <div className="span">{ contact.name }</div>
                                        <div className="latestMsg">
                                            <div className="span">{ contact.latest.content }</div>
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