import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef, useContext, notification } from 'react'
import { Button, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Message from '../../components/Message/Message.jsx'
import { ChatContext } from '../ChatContext/ChatContext.jsx'
import './chatbox.css'

const ChatBox = () => {
    const [ messageContent, setMessageContent ] = useState( '' )
    const [ allMessages, setAllMessages ] = useState( [] );
    const contentRef = useRef( null );
    const { data } = useContext( ChatContext );
    const ref = useRef();
    const navigate = useNavigate();

    useEffect( () => {
        ref.current?.scrollIntoView( { behavior: "smooth" } );
    }, [ allMessages ] )

    useEffect( () => {
        contentRef.current?.focus();
    }, [ messageContent ] );

    useEffect( () => {
        axios(
            {
                url: "http://39.106.5.232:3000/api/chat/getRecords/",
                method: "GET",
                params: {
                    id: data.singleContact.id,
                }
            }
        ).then( res => {
            console.log( data.singleContact )
            setAllMessages( res.data )
        } ).catch(
            err => {
                console.log( err );
                notification[ 'error' ]( {
                    message: 'Error getting records',
                } );
            }
        )
    }, [ data.singleContact ] );

    const sendMessage = () => {
        let formData = new FormData();
        formData.append( "id", data.singleContact.id );
        formData.append( "content", messageContent );
        if ( messageContent.length === 0 ) {
            alert( "Empty messages not allowed" )
        } else {
            axios(
                {
                    url: "http://39.106.5.232:3000/api/chat/sendRecord/",
                    method: "POST",
                    data: formData,
                }
            ).then( res => {
                setAllMessages( res.data );
                console.log( res.data );
                // console.log( res.data.slice().reverse() );
            } ).catch(
                err => {
                    console.log( err );
                    notification[ 'error' ]( {
                        message: 'Error entering chat',
                    } );
                }
            )
        }
        setMessageContent( '' );
    }

    const handleClickPhoto = () => {
        console.log( data.singleContact.name )
        navigate( '/profile/' + data.singleContact.owner )
    }

    return (
        <div className='ChatBox'>
            <div className="chatInfo">
                <div className="UserName">
                    { data.singleContact.name === "" ? data.singleContact.owner : data.singleContact.name }
                </div>
                <div className="UserPage">
                    <Button
                        type="text"
                        size={ 'large' }
                        icon={ <UserOutlined /> }
                        onClick={ handleClickPhoto }
                    />
                </div>
            </div>
            <div className="Messages">
                {
                    allMessages.map(
                        ( msg, key ) => {
                            return (
                                <Message
                                    key={ key }
                                    time={ msg.time }
                                    content={ msg.content }
                                    sender={ msg.sender }
                                    avatar={ msg.avatar }
                                />
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