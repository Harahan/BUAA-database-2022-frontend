import React from 'react'
import { message, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './loginComp.css'
import qs from 'qs'
import { useLocation, useNavigate } from 'react-router-dom'

export default function WrappedNormalLoginForm() {

    const state = {
        username: '',
        password: ''
    }
    const navigate = useNavigate();
    const location = useLocation()
    let back = location.state;
    const handleSubmit = () => {
        if (!state.username || !state.password) {
            return
        }
        let data = { username: state.username, password: state.password }
        console.log(data)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify({
                username: state.username,
                password: state.password
            }),
        };
        fetch("/api/user/login/", requestOptions)
            .then(res => res.json()).then(data => {
                if (data.code == 3) {
                    message.error('你已登录，请注销后再注册');
                    navigate('/', {
                        state: {
                            bool: true,
                            username: state.username,
                            password: state.password
                        }, replace: true
                    })
                } else if (data.code == 1) {
                    message.error('用户名或密码错误');
                } else if (data.code == 2) {
                    message.error('登录失败，请稍后尝试');
                } else if (data.code == 0) {
                    message.success('登录成功');
                    navigate('/', {
                        state: {
                            bool: true,
                            username: state.username,
                            password: state.password
                        }, replace: true
                    })
                }
            })
            .catch((error) => {
                message.error("登录失败")
                console.log(error);
            });
    }

    const handleChangeUsername = (e) => {
        state.username = e.target.value
    }

    const handleChangePwd = (e) => {
        state.password = e.target.value
    }
    return (
        <div className='login-div'>
            <div className='loginTitle'>Login</div>
            <Form onFinish={handleSubmit} className="login-form">
                <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        onChange={handleChangeUsername}
                        defaultValue={back == null ? "" : back.username}
                    />
                </Form.Item>
                <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
                    <Input
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        onChange={handleChangePwd}
                        defaultValue={back == null ? "" : back.password}
                    />
                </Form.Item>
                <Form.Item name='remember' valuePropName='checked' initialValue={true}>
                    <Checkbox style={{ marginLeft: '13%' }}>Remember Me</Checkbox>
                    <a className="login-form-forgot" href="http://www.baidu.com" style={{ marginLeft: '5%' }}>
                        Forgot password ?
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginLeft: '5%' }} >
                        Login
                    </Button>
                    <a href="/register" style={{ marginLeft: '5%' }}>Sign up</a>
                </Form.Item>
            </Form>
        </div>
    );
}