import React, { useContext } from 'react'
import 'antd/dist/antd.min.css'
import { Button, Tooltip, message } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'
import './chatnav.css'
import { UserContext } from '../UserContext/UserContext';
import { useNavigate } from 'react-router-dom'
function ChatNav() {
    const navigate = useNavigate();
    const { dispatch } = useContext(UserContext)
    const hadleClick = () => {
        fetch("/api/user/logout/")
            .then(res => res.json()).then(data => {
                if (data.code == 1) {
                    message.error('还未登录');
                } else if (data.code == 0) {
                    message.success('退出成功');
                    dispatch({ type: 'render', status: false, info: data })
                    navigate('/')
                }
            })
            .catch((error) => {
                message.error("退出失败")
                console.log(error);
            });
    }
    return (
        <div className="ChatNav">
            <div className="title">
                Chat
            </div>
            <div className="user">
                <div className="profile">
                    <img className="profilePic" src={rhaenyra_targaryen} alt="" />
                    <div className="rightProfile">
                        <div className='userName'>
                            Peaceminuczy
                        </div>
                        <Tooltip title="log out" className="logout">
                            <Button danger
                                shape="circle"
                                size={'small'}
                                icon={<LogoutOutlined />}
                                onClick={hadleClick} />
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatNav