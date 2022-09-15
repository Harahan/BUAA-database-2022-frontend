import React, { useState ,useEffect } from 'react'
import Navbar from '../components/Navbar'
import {Table ,Input, Typography} from 'antd'
import axios from 'axios';
import { reduceRight } from 'lodash-es';

const { Search } = Input
const {Text, Link} = Typography;


function History() {
  const [data, setData] = useState()

  const get_history = (()=>{
    axios.get('/forward/gethistory').then(res => {
      console.log(res)
      setData(res.data)
    },err => {
      console.log(err)
    })
  })
  
  const delete_history = (his_id) => {
  console.log(his_id)
  axios.delete('/forward/deletehis/'+his_id).then(
    res => {
      get_history()
      console.log(res)
    },err =>{
      console.log(err)
    }
  )
}

const columns = [
  {
    title: 'Table_id',
    dataIndex: 'table_id',
    key: 'table_id',
    sorter:{
      compare:(a, b) => a.table_id - b.table_id,
    }
  },
  {
    title: 'Question_id',
    dataIndex: 'question_id',
    key: 'question_id',
    sorter:{
      compare:(a, b) => a.question_id - b.question_id,
    }
  },
  {
    title: 'Type',
    dataIndex: 'history_type',
    key: 'history_type',
    sorter:{
      compare:(a, b) => a.history_type - b.history_type,
    }
  },
  {
    title: 'Time',
    dataIndex: 'practice_time',
    key: 'practice_time',
    sorter:{
      compare:(a, b) => a.practice_time - b.practice_time,
    }
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    sorter:{
      compare:(a, b) => a.score - b.score,
    }
  },
  {
    title: 'Answer',
    dataIndex: 'answer',
    key: 'answer',
    sorter:{
      compare:(a, b) => a.answer - b.answer,
    }
  },
  {
    title:'Action',
    dataIndex: '',
    key:'delete',
    render:(text,record) => (
      <Link 
      onClick={() => delete_history(record.table_id)}
      >
      delete
      </Link>
    ),
  }
];

    useEffect(() => {
    let ignore = false;
    if(!ignore) get_history()
    return () => {ignore = true; }
  },[])

  const onSearch = (value) => {
  console.log(value)
  axios.get('/forward/searchhis/',{
    params: {
      search:value
    }
  }).then(res => {
    console.log(res)
    setData(res.data)
  },err=>{
    console.log(err)
  })
}

  return (
    <div>
      <Navbar/>
      <div className='SearchBar'>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton="Search" 
          size="middle"
        />
      </div>
      <div className='table'>
        <Table rowclassName='table-row'  
        columns={columns} 
        dataSource={data}/>
      </div>
    </div>
  )
}

export default History