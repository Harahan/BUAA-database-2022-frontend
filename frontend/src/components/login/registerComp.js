import {
  message,
  Button,
  Checkbox,
  Form,
  Input
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import React from 'react'
import './registerComp.css'
import qs from 'qs';
import { useNavigate } from 'react-router-dom'

export default function WrappedRegistrationForm() {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    console.log('Received values of form: ', values);
    if (!values.password || !values.username) {
      return
    }
    let data = { username: values.username, password: values.password }
    console.log(data)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: qs.stringify({
        username: values.username,
        password: values.password
      }),
    };
    fetch("/api/user/signup/", requestOptions)
      .then(res => res.json()).then(data => {
        if (data.code == 3) {
          message.error('你已登录，请注销后再注册');
          navigate('/', {
            state: {
              bool: true,
              username: values.username,
              password: values.password
            }, replace: true
          })
        } else if (data.code == 1) {
          message.error('此用户名已被注册');
        } else if (data.code == 2) {
          message.error('注册失败，请稍后尝试');
        } else if (data.code == 0) {
          message.success('注册成功');
          navigate('/login', {
            state: {
              bool: false,
              username: values.username,
              password: values.password
            }, replace: true
          })
        }
      })
      .catch((error) => {
        message.error("注册失败")
        console.log(error);
      });
  }
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    // <div className='loginRegister'>注册</div>
    <div className='registerDiv'>
      <div className='redisterTitle'>Sign up</div>
      <Form {...formItemLayout} form={form}
        name="register"
        onFinish={handleSubmit}
        scrollToFirstError
        className='register-form'>
        <Form.Item
          name="username"
          label="username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="www.baidu.com">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}