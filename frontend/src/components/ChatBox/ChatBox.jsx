import React from 'react'
import { Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './chatbox.css'

const ChatBox = () => {
    return (
        <div className='ChatBox'>
            <div className="chatInfo">
                <div className="UserName">
                    Carol
                </div>
                <div className="UserPage">
                    <Button
                        type="text"
                        size={ 'large' }
                        icon={ <UserOutlined /> }
                    />
                </div>
            </div>
        </div>
    )
}

export default ChatBox