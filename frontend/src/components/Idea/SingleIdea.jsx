import React, { useContext } from 'react'
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect, createElement } from 'react'
import { Input, Button, Comment, Tooltip, Form, Popconfirm, Avatar, message } from 'antd';
import axios from 'axios';
import IdeaObject from '../ideaobject/IdeaObject';
import './SingleIdea.css'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../components/UserContext/UserContext'

const { TextArea } = Input;

const Editor = ( { onChange, onSubmit, submitting, value } ) => (
    <>
        <Form.Item>
            <TextArea
                rows={ 4 }
                onChange={ onChange }
                value={ value }
                allowClear={ true }
            />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={ submitting } onClick={ onSubmit } type="primary">
                Comment
            </Button>
        </Form.Item>
    </>
);

function SingleIdea () {
    const location = useLocation()
    const ideaData = {
        username: location.state.idea.usename,
        avatar: location.state.idea.avatar,
        content: location.state.idea.content,
        time: location.state.idea.time,
        tot_like: location.state.idea.tot_like,
        tot_dislike: location.state.idea.tot_dislike,
        tot_comment: location.state.idea.tot_comment,
        comment: [
            {
                username: "hhhh",
                avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                content: "We love it!!!",
                time: '8 hours ago',
                real_time: "2022-11-12 11:22:33",
                likes: 1,
                dislikes: 2
            },
            {
                username: "crazy student",
                avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                content: "WE R CRAZY !!!",
                time: '8 hours ago',
                real_time: "2022-11-12 11:22:33",
                likes: 1,
                dislikes: 2
            },
            {
                username: "crazy student",
                avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                content: "WE R CRAZY !!!",
                time: '8 hours ago',
                real_time: "2022-11-12 11:22:33",
                likes: 1,
                dislikes: 2
            },
            {
                username: "crazy student",
                avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                content: "WE R CRAZY !!!",
                time: '8 hours ago',
                real_time: "2022-11-12 11:22:33",
                likes: 1,
                dislikes: 2
            },
            {
                username: "crazy student",
                avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                content: "WE R CRAZY !!!",
                time: '8 hours ago',
                real_time: "2022-11-12 11:22:33",
                likes: 1,
                dislikes: 2
            },
            {
                username: "crazy student",
                avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                content: "WE R CRAZY !!!",
                time: '8 hours ago',
                real_time: "2022-11-12 11:22:33",
                likes: 1,
                dislikes: 2
            }, {
                username: "crazy student",
                avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                content: "WE R CRAZY !!!",
                time: '8 hours ago',
                real_time: "2022-11-12 11:22:33",
                likes: 1,
                dislikes: 2
            }
        ]
    }
    const { data } = useContext( UserContext );
    const [ likes, setLikes ] = useState( 0 );
    const [ dislikes, setDislikes ] = useState( 0 );
    const [ action, setAction ] = useState( null );
    const [ idea, setIdea ] = useState( ideaData );
    const [ submitting, setSubmitting ] = useState( false );
    const [ value, setValue ] = useState( '' );
    const commentError = () => {
        message.warning( 'Comment timeout' );
    };

    const handleSubmit = () => {
        if ( !value ) {
            return;
        }
        console.log( value );
        let formData = new FormData();
        formData.append( "obj_type", 0 );
        formData.append( "obj_id", "" );
        formData.append( "content", value );
        setSubmitting( true );
        axios(
            {
                url: "http://localhost:3000/api/response/addComment",
                method: "POST",
                data: formData,
            }
        ).then(
            res => {
                setSubmitting( false );
            }
        )
        setTimeout( () => {
            setSubmitting( false );
            setValue( '' );
            commentError();
        }, 10000 );
    };

    const handleChange = ( e ) => {
        setValue( e.target.value );
    };


    const like = () => {
        setLikes( 1 );
        setDislikes( 0 );
        setAction( 'liked' );
    };
    const dislike = () => {
        setLikes( 0 );
        setDislikes( 1 );
        setAction( 'disliked' );
    };
    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={ like }>
                { createElement( action === 'liked' ? LikeFilled : LikeOutlined ) }
                <span className="comment-action">{ likes }</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={ dislike }>
                { React.createElement( action === 'disliked' ? DislikeFilled : DislikeOutlined ) }
                <span className="comment-action">{ dislikes }</span>
            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    return (
        <div className="SingleIdea">
            <div className="Idea">
                <IdeaObject
                    className="IdeaContent"
                    avatar={ idea.avatar }
                    username={ idea.username }
                    content={ idea.content }
                    time={ idea.time }
                />
            </div>
            <div className="ideaComment">
                { idea.comment.map(
                    ( comm, key ) => {
                        return (
                            <Comment
                                actions={ actions }
                                author={ <a>{ comm.username }</a> }
                                avatar={ <img src={ comm.avatar } alt="none" /> }
                                content={
                                    <p>
                                        { comm.content }
                                    </p>
                                }
                                datetime={
                                    <Tooltip title={ comm.real_time }>
                                        <span>{ comm.time }</span>
                                    </Tooltip>
                                }
                            />
                        )
                    }
                ) }
            </div>
            <div className="commentBox" >
                <Comment
                    avatar={ <Avatar src={ data.info.avatar } alt="None" /> }
                    content={
                        <Editor
                            onSubmit={ handleSubmit }
                            onChange={ handleChange }
                            submitting={ submitting }
                            value={ value }
                        />
                    }
                />
            </div>
        </div>
    )
}

export default SingleIdea