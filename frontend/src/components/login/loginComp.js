import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './loginComp.css'
import axios from 'axios'
// import qs from 'qs'

class WrappedNormalLoginForm extends React.Component {

    state = {
        username: '',
        password: ''
    }

    submitHandle = () => {
        if (!this.state.username || !this.state.password) {
            return
        }
        let data = { username: this.state.username, password: this.state.password }
        console.log(data)
        let url = 'http://192.168.21.33:8001/fapp/user/login/'
        axios.post(url, data, { headers: { 'Content-Type': 'application/json' } }
        ).then(res => {
            if (res.status === 200 && res.data.code === 1) {
                alert('登录成功。')
                this.props.history.push('/homepage')
            }
            else {
                console.log(res)
                alert('登录失败：' + res.data.msg)
            }

        })
    }

    handleSubmit = (e) => {
        console.log(this.state)
        e.preventDefault();
        let error = false
        this.props.form.validateFields((err, values) => {
            console.log('huxb')
            console.log(err)
            console.log(values)
            if (!err) {
                console.log('error' + error)
                console.log('Received values of form: ', values);
                return
            }
        });
        this.submitHandle()
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
        console.log(this.props)
        return (
            <div className='login-div'>
                <div className='loginTitle'>登录</div>
                <Form onSubmit={this.handleSubmit} className="login-form">
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
                        <Checkbox style={{ marginLeft: '13%' }}>记住我</Checkbox>
                        <a className="login-form-forgot" href="http://www.baidu.com" style={{ marginLeft: '5%' }}>
                            忘记密码
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginLeft: '5%' }}>
                            登录
                        </Button>
                        <a href="/register" style={{ marginLeft: '5%' }}>去注册</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default WrappedNormalLoginForm;