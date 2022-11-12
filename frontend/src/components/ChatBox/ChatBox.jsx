import React from 'react'
import axios from 'axios'
import { useState, useEffect, useRef, useContext, notification } from 'react'
import { Button, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Message from '../../components/Message/Message.jsx'
import { ChatContext } from '../ChatContext/ChatContext.jsx'
import './chatbox.css'

const ChatBox = () => {
    const messages = [
        {
            sender: 1,
            content: "hello",
            time: "3 hours ago",
        },
        {
            sender: 0,
            content: "hello",
            time: "1",
        },
        {
            sender: 0,
            content: "hello",
            time: "2",
        },
        {
            sender: 0,
            content: "hello",
            time: "3",
        },
        {
            sender: 0,
            content: "hello",
            time: "4",
        },
        {
            sender: 0,
            content: "hello",
            time: "5",
        },
        {
            sender: 0,
            content: "hello",
            time: "6",
        },
        {
            sender: 0,
            content: "hello",
            time: "7",
        },
        {
            sender: 0,
            content: "hello",
            time: "8",
        },
        {
            sender: 10,
            content: "hello",
            time: "9",
        },
        {
            sender: 0,
            content: "hello",
            time: "just now",
        }
    ]
    const [ messageContent, setMessageContent ] = useState( '' )
    const [ allMessages, setAllMessages ] = useState( messages );
    const contentRef = useRef( null );
    const { data } = useContext( ChatContext );
    const ref = useRef();

    useEffect( () => {
        ref.current?.scrollIntoView( { behavior: "smooth" } );
    }, [ messages ] )

    useEffect( () => {
        contentRef.current?.focus();
    }, [ messageContent ] );

    const sendMessage = () => {
        let formData = new FormData();
        formData.append( "username", data.singleContact.username );
        formData.append( "message", messageContent );
        console.log( messageContent );
        axios(
            {
                url: "http://localhost:3000/api/sendmessage",
                method: "POST",
                data: formData,
            }
        ).then( res => {
            setAllMessages( res );
        } ).catch(
            err => {
                console.log( err );
                notification[ 'error' ]( {
                    message: 'Error entering chat',
                } );
            }
        )
        setMessageContent( '' );
    }

    return (
        <div className='ChatBox'>
            <div className="chatInfo">
                <div className="UserName">
                    { data.singleContact.username }
                </div>
                <div className="UserPage">
                    <Button
                        type="text"
                        size={ 'large' }
                        icon={ <UserOutlined /> }
                    />
                </div>
            </div>
            <div className="Messages">
                {
                    allMessages.map(
                        ( msg, key ) => {
                            return (
                                <Message time={ msg.time } content={ msg.content } sender={ msg.sender } />
                            );
                        }
                    )
                }
                <a className="toBottom" name="1" href="#1" >&nbsp;</a>
            </div>
            <div className="input">
                <Input.Group compact>
                    <Input
                        ref={ contentRef }
                        size="large"
                        allowClear="true"
                        showCount="true"
                        value={ messageContent }
                        onChange={ ( e ) => {
                            setMessageContent( e.target.value )
                        } }
                        onPressEnter={ sendMessage }
                        style={ { width: '90%', } }
                    />
                    <Button
                        size="large"
                        type="dashed"
                        onClick={ sendMessage }
                    >
                        Send
                    </Button>
                </Input.Group>
            </div>
        </div>
    )
}

export default ChatBox