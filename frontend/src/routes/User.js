import React, {useState, useEffect} from 'react';
import {UserOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons'
import {Table,Button, Modal, Input, Space} from 'antd';
import Navbar from '../components/Navbar'
import 'antd/dist/antd.css';
import './User.css'
import axios from 'axios'

const columns = [
  {
    title: 'Highest Score',
    dataIndex: 'highest_score',
    key: 'highest_score',
    sorter:{
      compare:(a, b) => a.highest_score - b.highest_score,
      multiple: 3,
    }
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter:{
      compare:(a, b) => a.name - b.name,
      multiple: 2,
    }
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
    sorter:{
      compare:(a, b) => a.password - b.password,
      multiple: 1,
    }
  },
];



function User() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [score, setScore] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const add_user = () => {
    axios.put('/forward/adduser/',{
      "highest_score":score,
      "name":name,
      "password":password
    }).then(res => {
      hideModal()
      get_user()
    },err=>{
      console.log(err)
      hideModal()
    })
  }

  const get_user = (() => {
    axios.get('/forward/getuser').then(res =>{
      console.log(res)
      setData(res.data)
    }, err => {
      console.log(err)
    })
  })

    useEffect(() => {
    let ignore = false;
    if(!ignore) get_user()
    return () => {ignore = true; }
  },[])

  const showModal = () =>{
    setOpen(true);
  }

  const hideModal = () => {
    console.log("hiding")
    setOpen(false);
  }
  return (
      <div>
         <Navbar/>
         <div className='AddBar'>
          <Button onClick={showModal}>
           ADD
          </Button>
          <Modal
            title="增加用户"
            open={open}
            onOk={add_user}
            onCancel={hideModal}
            okText="ok"
            cancelText="cancel"
            >
            <Space 
            direction="vertical"
            style={{ width: '80%' }}
            size="middle">
              <Input
              onChange={(e)=>{
                setScore(e.target.value)
              }}
              size="middle"
              placeholder="highest score"
            />
            <Input
              onChange={(e)=>{
                setName(e.target.value)
              }}
              size="middle"
              placeholder='username'
              prefix={<UserOutlined/>}
            />
            <Input.Password
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
              size="middle"
              placeholder='password'
              iconRender={(visible) => 
                (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
            />
            </Space>
            </Modal>
      </div>
         <div className='table'>
          <Table rowclassName='table-row'  columns={columns} dataSource={data}/>
         </div>
      </div>
  )
}

export default User