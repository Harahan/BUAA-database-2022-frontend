import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Comment, Avatar, message, Tooltip, Input, Form, } from 'antd'
import { UserContext } from '../UserContext/UserContext'
import Response from '../Response/Response'
import { useState, useEffect, useContext } from 'react'
import './postobject.css'
import qs from 'qs'

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

export default function Postobject ( { authorName, releaseTime, categories, title, html, followed, id } ) {
    const handleFollow = () => {
        console.log( "click" )
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify( {
                authorName: authorName
            } ),
        };
        fetch( "/api/user/follow/", requestOptions )
            .then( res => res.json() ).then( data => {
                if ( data.code === 3 ) {
                    alert( '还未登录' );
                    window.location.href = "/login";
                } else if ( data.code === 1 ) {
                    message.success( '取关成功' );
                } else if ( data.code === 2 ) {
                    message.error( '关注失败，请稍后尝试' );
                } else if ( data.code === 0 ) {
                    message.success( '关注成功' );
                } else {
                    message.error( '无法关注自己' );
                }
            } )
            .catch( ( error ) => {
                alert( "关注失败" )
                console.log( error );
            } );
    }
    const handleDelete = () => {
        console.log( "delete" )
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify( {
                username: authorName,
                tit: title
            } ),
        };
        fetch( "/api/blog/delete/", requestOptions )
            .then( res => res.json() ).then( data => {
                if ( data.code === 3 ) {
                    alert( '还未登录或权限不足' );
                } else if ( data.code === 1 ) {
                    message.success( '文章不存在' );
                } else if ( data.code === 2 ) {
                    message.error( '删除失败，请稍后尝试' );
                } else if ( data.code === 0 ) {
                    message.success( '删除成功' );
                    window.location.href = "/home";
                }
            } )
    }
    const ExampleComment = ( { children } ) => (
        <Comment
            actions={ [ <span key="comment-nested-reply-to">Reply to</span> ] }
            author={ <a>Han Solo</a> }
            avatar={ <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" /> }
            content={
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure).
                </p>
            }
        >
            { children }
        </Comment>
    );

    const commentError = () => {
        message.warning( 'Comment timeout' );
    };

    const [ value, setValue ] = useState( '' );
    const [ submitting, setSubmitting ] = useState( false );
    const { data } = useContext( UserContext );

    const handleSubmit = () => {
        if ( !value ) {
            return;
        }
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify( {
                obj_type: 1,
                obj_id: id,
                content: value
            } ),
        };
        console.log( value );
        fetch( "/api/response/addComment/", requestOptions )
            .then( res => res.json() ).then( data => {
                setSubmitting( false );
                console.log( data );
                setValue( "" );
            } )
        setTimeout( () => {
            setSubmitting( false );
            commentError();
        }, 100000 );
    };

    const handleChange = ( e ) => {
        setValue( e.target.value );
    };

    const [ html_content, setHtml_content ] = useState( "" );
    const [ comment, setComment ] = useState( [] );
    const [ totcomment, setTotcomment ] = useState( null );
    useEffect( () => {
        setHtml_content( html );
        let requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify( {
                obj_type: 1,
                obj_id: id,
            } ),
        }
        fetch( "/api/response/findComments/", requestOptions )
            .then( res => res.json() ).then( data => {
                setComment( data );
                console.log( data );
            } )
    }, [ id, value, html ] )
    return (
        <div className="postObject">
            <div className="postPadding">
                <h1 className='postTitle'>{ title }</h1>
                <div className="editBar">
                    <div className="authorName">
                        <p>{ authorName }</p>
                    </div>
                    <div className="followButton" onClick={ handleFollow }>
                        <Button type="dashed">{ followed ? "Unfollow" : "Follow" }</Button>
                    </div>
                    <Button className="editButton" icon={ <EditOutlined /> } />
                    <Button className="deleteButton" icon={ <DeleteOutlined /> } onClick={ handleDelete } />
                    <div className="postTime">
                        { releaseTime }
                    </div>
                </div>
                <div className="postContent">
                    <div className="editor-content-view"
                        dangerouslySetInnerHTML={ { __html: html_content } }
                    />
                </div>
                <div className="blogComment">
                    { comment.map(
                        ( comm, key ) => {
                            return (
                                <div className="comment">
                                    <Comment
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
                                    <Response
                                        stance={ comm.stance }
                                        tot_like={ comm.tot_like }
                                        tot_dislike={ comm.tot_dislike }
                                        type={ 2 }
                                        id={ comm.id }
                                    />
                                </div>

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
        </div>
    )
}
