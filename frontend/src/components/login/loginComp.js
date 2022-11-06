import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './loginComp.css'
// import qs from 'qs'

class WrappedNormalLoginForm extends React.Component {

    state = {
        username: '',
        password: ''
    }

    handleSubmit = () => {
        if (!this.state.username || !this.state.password) {
            return
        }
        let data = { username: this.state.username, password: this.state.password }
        console.log(data)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
        };
        fetch("/api/login", requestOptions)
            .then((response) => {
                if (response.ok) {
                    this.props.history.push(`/home`);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleChangePwd = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div className='login-div'>
                <div className='loginTitle'>Login</div>
                <Form onFinish={this.handleSubmit} className="login-form">
                    <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            onChange={this.handleChangeUsername}
                        />
                    </Form.Item>
                    <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input
                            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            onChange={this.handleChangePwd}
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
}

export default WrappedNormalLoginForm;