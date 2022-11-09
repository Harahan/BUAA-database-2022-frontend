import React from 'react'
import 'antd/dist/antd.min.css'
import { Button, Tooltip } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'
import './chatnav.css'

function ChatNav () {
    return (
        <div className="ChatNav">
            <div className="title">
                Chat
            </div>
            <div className="user">
                <div className="profile">
                    <img className="profilePic" src={ rhaenyra_targaryen } alt="" />
                    <div className='userName'>
                        Peaceminuczy
                    </div>
                </div>
                <Tooltip title="log out" className="logout">
                    <Button danger
                        shape="circle"
                        size={ 'small' }
                        icon={ <LogoutOutlined /> } />
                </Tooltip>
            </div>
        </div>
    )
}

export default ChatNav