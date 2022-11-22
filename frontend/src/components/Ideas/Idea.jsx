import React from 'react'
import { useRef, useState, useEffect, createElement } from 'react'
import { Input, Button, Comment, Tooltip, Avatar, message } from 'antd';
import './idea.css'
import IdeaObject from '../ideaobject/IdeaObject';
import qs from 'qs'
const { TextArea } = Input;
function Idea () {
    const contentRef = useRef( null );
    const [ ideaContent, setIdeaContent ] = useState( '' )
    const [ loading, setLoading ] = useState( false )
    const [ allIdea, setAllIdea ] = useState( [] )
    useEffect( () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify( {
                content: "",
            } ),
        };
        fetch( "/api/moment/sendMoment/", requestOptions )
            .then( res => res.json() ).then( data => {
                if ( data.code === 1 ) {
                    message.error( '还未登录' );
                } else if ( data.code === 0 ) {
                    console.log( data.data )
                    setAllIdea( data.data )
                }
            } )
    }, [] )

    useEffect( () => {
        contentRef.current?.focus();
    }, [ ideaContent ] );

    const sendIdea = () => {
        setLoading( true )
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify( {
                content: ideaContent,
            } ),
        };
        fetch( "/api/moment/sendMoment/", requestOptions )
            .then( res => res.json() ).then( data => {
                if ( data.code === 1 ) {
                    message.error( 'Please log in' );
                } else if ( ideaContent === "" ) {
                    message.error( 'Please write down your idea' )
                } else if ( data.code === 0 ) {
                    setAllIdea( data.data )
                    setIdeaContent( '' )
                    message.success( 'Successfully sent' );
                }
            } )
            .catch( ( error ) => {
                message.error( "Fail to send idea" )
                console.log( error );
            } );
        setLoading( false )
    }
    return (
        <div className="Idea">
            <div className="postIdea">
                <TextArea
                    ref={ contentRef }
                    rows={ 7 }
                    placeholder="maxLength is 300"
                    maxLength={ 300 }
                    autoSize={ { minRows: 3, maxRows: 5 } }
                    allowClear={ true }
                    value={ ideaContent }
                    onChange={ ( e ) => {
                        setIdeaContent( e.target.value )
                        // console.log( ideaContent )
                    } }
                />
                <div className="postBtn">
                    <Button
                        type="primary"
                        loading={ loading }
                        onClick={ sendIdea }
                    >
                        Post
                    </Button>
                </div>
            </div>
            <div className="allIdeas">
                {
                    allIdea.map(
                        ( idea, key ) => {
                            return (
                                <IdeaObject
                                    avatar={ idea.avatar }
                                    username={ idea.username }
                                    content={ idea.content }
                                    time={ idea.time }
                                    id={ idea.id }
                                    stance={ idea.stance }
                                    tot_like={ idea.tot_like }
                                    tot_dislike={ idea.tot_dislike }
                                    tot_comment={ idea.tot_comment }
                                />
                            );
                        }
                    )
                }
            </div>
        </div>
    )
}

export default Idea