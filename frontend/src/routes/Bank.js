import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import {Table, Row, Button, Input, Modal, Space } from 'antd'
import qs from 'qs'

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

function Bank() {
  const [data, setData] = useState()
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState()
  const [ans_a, setAns_a] = useState()
  const [ans_b, setAns_b] = useState()
  const [ans_c, setAns_c] = useState()
  const [ans_d, setAns_d] = useState()
  const [ans, setAns] = useState()
  const [provider, setProvider] = useState()
  const [type, setType] = useState()
  const [select, setSelect] = useState()
  const [cur_ans, setCur_ans] = useState()


  const get_question = (() => {
    axios.get('/forward/getquestion').then(res => {
      console.log(res)
      setData(res.data)
    }, err => {
      console.log(err)
    })
  })

  useEffect(() => {
    let ignore = false;
    if(!ignore) get_question()
    return () => {ignore = true; }
  },[])

  const showModal = () => {
    setOpen(true)
  }

  const hideModal = () => {
    console.log('hiding')
    setOpen(false)
  }

  const add_question = () => {
    axios.put('/forward/addquestion/',{
        "A":ans_a,
        "B":ans_b,
        "C":ans_c,
        "D":ans_d,
        "answer":ans,
        "provider":provider,
        "question":question,
        "type":type,
        "select_question":select
    }).then(res=>{
      hideModal()
      get_question()
    },err=>{
      console.log(err)
      hideModal()
    })
  }


  const change_ans = (question_id) => {
    let params = new URLSearchParams();
    params.append('answer',cur_ans)
    console.log('changing answer')
    axios.post(
      '/forward/changeans/'+ question_id + '/',
      params)
      .then(res => {
      get_question()
      },err => {
      console.log(err)
      })
  }

  return (
    <div>
      <Navbar/>
      <div className='AddBar'>
        <Button onClick={showModal}>
          ADD
        </Button>
        <Modal
            title="增加题目"
            open={open}
            onOk={add_question}
            onCancel={hideModal}
            okText="ok"
            cancelText="cancel"
        >
        <Space 
            direction="vertical"
            style={{ width: '100%' }}
            size="large">
              <Input
              onChange={(e)=>{
                setQuestion(e.target.value)
              }}
              size="middle"
              placeholder="题目"
            />
            <Input
              onChange={(e)=>{
                setAns_a(e.target.value)
              }}
              size="middle"
              placeholder='A'
            />
            <Input
              onChange={(e)=>{
                setAns_b(e.target.value)
              }}
              size="middle"
              placeholder='B'
            />
            <Input
              onChange={(e)=>{
                setAns_c(e.target.value)
              }}
              size="middle"
              placeholder='C'
            />
            <Input
              onChange={(e)=>{
                setAns_d(e.target.value)
              }}
              size="middle"
              placeholder='D'
            />
            <Input
              onChange={(e)=>{
                setAns(e.target.value)
              }}
              size="middle"
              placeholder='answer'
              style={{ width: '100%' }}
            />
            <Input
              onChange={(e)=>{
                setProvider(e.target.value)
              }}
              size="middle"
              placeholder='provider'
              style={{ width: '100%' }}
            />
            <Input
              onChange={(e)=>{
                setType(e.target.value)
              }}
              size="middle"
              placeholder='type'
              style={{ width: '100%' }}
            />
            <Input
              onChange={(e)=>{
                setSelect(e.target.value)
              }}
              size="middle"
              placeholder='select_question'
              style={{ width: '100%' }}
            />
            </Space>
        </Modal>
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
            <Input 
            style={{ width: 'calc(100% - 200px)' }} 
            placeholder="change the answer to " 
            onChange={(e)=>{
              setCur_ans(e.target.value)
            }}
            />
            <Button type="primary" onClick={() => change_ans(record.question_id)}>Submit</Button>
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