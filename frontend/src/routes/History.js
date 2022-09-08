import React from 'react'
import Navbar from '../components/Navbar'
import {Table ,Input} from 'antd'

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
    render:() => <a>Delete</a>
  }
];


const data = [
    {
        "answer": "",
        "history_type": "搜索题目",
        "practice_time": 0,
        "question_id": 98,
        "score": -1.0,
        "table_id": 1
    },
    {
        "answer": "B",
        "history_type": "小练习",
        "practice_time": 1,
        "question_id": 1022,
        "score": 10.0,
        "table_id": 2
    },
    {
        "answer": "B",
        "history_type": "小练习",
        "practice_time": 1,
        "question_id": 213,
        "score": 0.0,
        "table_id": 3
    }
]

const { Search } = Input

const onSearch = (value) => console.log(value);


function History() {
  return (
    <div>
      <Navbar/>
      <div className='SearchBar'>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton="Search" 
          size="large"
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