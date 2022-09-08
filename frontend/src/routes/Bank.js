import React from 'react'
import Navbar from '../components/Navbar'
import {Table, Row, Button, Input} from 'antd'

const columns = [
  {
    title: 'Question',
    dataIndex: 'select_question',
    key: 'select_question',
    sorter:{
      compare:(a, b) => a.select_question - b.select_question,
    }
  },
  {
    title: 'A',
    dataIndex: 'A',
    key: 'A',
    sorter:{
      compare:(a, b) => a.A - b.A,
    }
  },
  {
    title: 'B',
    dataIndex: 'B',
    key: 'B',
    sorter:{
      compare:(a, b) => a.B - b.B,
    }
  },
  {
    title: 'C',
    dataIndex: 'C',
    key: 'C',
    sorter:{
      compare:(a, b) => a.C - b.C,
    }
  },
  {
    title: 'D',
    dataIndex: 'D',
    key: 'D',
    sorter:{
      compare:(a, b) => a.D - b.D,
    }
  },
];

const data = [
    {
        "A": "西昌卫星发射中心",
        "B": "酒泉卫星发射中心",
        "C": "太原卫星发射中心",
        "D": "海南文昌航天发射场",
        "answer": "B",
        "provider": "原始题库",
        "question": "我国载人飞船的发射场为______。\nA.西昌卫星发射中心\nB.酒泉卫星发射中心\nC.太原卫星发射中心\nD.海南文昌航天发射场",
        "question_id": 1,
        "select_question": "我国载人飞船的发射场为______。",
        "type": "客观题"
    },
    {
        "A": "11",
        "B": "15",
        "C": "16",
        "D": "18",
        "answer": "C",
        "provider": "原始题库",
        "question": "国际空间站是人类历史上最庞大的航天工程，共有______个国家参与研制。\nA.11\nB.15\nC.16\nD.18",
        "question_id": 2,
        "select_question": "国际空间站是人类历史上最庞大的航天工程，共有______个国家参与研制。",
        "type": "客观题"
    }]


function Bank() {
  return (
    <div>
      <Navbar/>
      <div className='AddBar'>
        <Button>
          ADD
        </Button>
      </div>
      <div className='table'>
        <Table 
        rowclassName='table-row'  
        columns={columns} 
        expandable = {{
          expandedRowRender: 
          record =>  
          <Row>
          <p style={{ margin: 12 }}> answer: {record.answer} </p>
          <p style={{ margin: 12 }}> type: {record.type} </p>
          <p style={{ margin: 12 }}> provider: {record.provider} </p>
          <Input.Group compact>
            <Input style={{ width: 'calc(100% - 200px)' }} placeholder="修改答案为" />
            <Button type="primary">Submit</Button>
          </Input.Group>
          </Row>,
        }}
        rowKey="select_question"
        dataSource={data}
        />
      </div>
    </div>
  )
}

export default Bank