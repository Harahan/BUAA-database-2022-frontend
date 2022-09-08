import React from 'react';
import {Table,Button} from 'antd';
import Navbar from '../components/Navbar'
import 'antd/dist/antd.css';
import './User.css'

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

const data = [
    {
        "highest_score": 0,
        "name": "hys",
        "password": "123456"
    }
];

function User() {
  return (
      <div>
         <Navbar/>
         <div className='AddBar'>
          <Button>
           ADD
          </Button>
      </div>
         <div className='table'>
          <Table rowclassName='table-row'  columns={columns} dataSource={data}/>
         </div>
      </div>
  )
}

export default User