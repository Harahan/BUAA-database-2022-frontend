import React from 'react'
import { Input } from 'antd';
import "./chatSearch.css"
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'

const { Search } = Input;
const onSearch = ( value ) => console.log( value );

function ChatSearch () {
    return (
        <div className="ChatSearch">
            <div className="searchForm">
                <Search
                    placeholder="Find a user"
                    onSearch={ onSearch }
                    style={ {
                        width: 250,
                    } }
                />
            </div>
            <div className="userChat">
                <img className="profilePic" src={ rhaenyra_targaryen } alt="" />
                <div className="chatUserInfo">
                    <div className="span">name</div>
                </div>
            </div>
            <div className="userChat">
                <img className="profilePic" src={ rhaenyra_targaryen } alt="" />
                <div className="chatUserInfo">
                    <div className="span">name</div>
                </div>
            </div>
            <div className="userChat">
                <img className="profilePic" src={ rhaenyra_targaryen } alt="" />
                <div className="chatUserInfo">
                    <div className="span">name</div>
                </div>
            </div>
        </div>
    )
}

export default ChatSearch