import React, { useContext, useState, useEffect, createElement } from 'react'
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined, CommentOutlined } from '@ant-design/icons'
import { Input, Button, Comment, Tooltip, Form, Popconfirm, Avatar, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import IdeaObject from '../ideaobject/IdeaObject';
import './SingleIdea.css'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../components/UserContext/UserContext'
import Response from '../Response/Response';

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
    const [ ideaData, setIdeaData ] = useState( { id: 1 } )
    const { data } = useContext( UserContext );
    const [ submitting, setSubmitting ] = useState( false );
    const [ value, setValue ] = useState( '' );
    const commentError = () => {
        message.warning( 'Comment timeout' );
    };
    const [ totcomment, setTotcomment ] = useState( null );
    const [ comment, setComment ] = useState( [] );

    useEffect(
        () => {
            let requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: qs.stringify( {
                    id: location.state.idea.id,
                } ),
            };
            fetch( "/api/moment/getMoment/", requestOptions )
                .then( res => res.json() )
                .then( data => {
                    setIdeaData( data )
                    console.log( data )
                    requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: qs.stringify( {
                            obj_type: 0,
                            obj_id: data.id,
                        } ),
                    }
                    fetch( "/api/response/findComments/", requestOptions )
                        .then( res => res.json() ).then( data => {
                            setComment( data );
                            console.log( data );
                        } )
                } )
        }, [ location.state.idea.id, value ] )

    const handleSubmit = () => {
        if ( !value ) {
            return;
        }
        console.log( value );
        console.log( ideaData );
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify( {
                obj_type: 0,
                obj_id: ideaData.id,
                content: value
            } ),
        };
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


    return (
        <div className="SingleIdea">
            <div className="Idea">
                <IdeaObject
                    id={ ideaData.id }
                    stance={ ideaData.stance }
                    tot_like={ ideaData.tot_like }
                    tot_dislike={ ideaData.tot_dislike }
                    tot_comment={ ideaData.tot_comment }
                    time={ ideaData.time }
                    content={ ideaData.content }
                    avatar={ ideaData.avatar }
                />
            </div>
            <div className="ideaComment">
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
    )
}

export default SingleIdea