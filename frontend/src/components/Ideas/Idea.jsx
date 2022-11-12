import React from 'react'
import { useRef, useState, useEffect, createElement } from 'react'
import { Input, Button, Comment, Tooltip, Avatar } from 'antd';
import './idea.css'
import IdeaObject from '../ideaobject/IdeaObject';

const { TextArea } = Input;

const ideas = [
    {
        username: "czy",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        content: "Hello,Let's go screwy screaming and crawling.WE are all getting crazy",
        time: "1 seconds ago",
    },
    {
        username: "ChanZiying",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        content: "Hello",
        time: "2022-4-28",
    },
    {
        username: "czy",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        content: "Hello",
        time: "2022-9-28",

    },
    {
        username: "czy",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        content: "Hello",
        time: "2022-9-28",

    },
    {
        username: "czy",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        content: "Hello",
        time: "2022-9-28",

    },
    {
        username: "czy",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        content: "Hello",
        time: "2022-9-28",

    },
    {
        username: "czy",
        avatar: "//images.weserv.nl/?url=https://upload-images.jianshu.io/upload_images/5809200-a99419bb94924e6d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
        content: "Hello",
        time: "2022-9-28",

    }
]


function Idea () {
    const contentRef = useRef( null );
    const [ ideaContent, setIdeaContent ] = useState( '' )
    const [ loading, setLoading ] = useState( false )
    const [ allIdea, setAllIdea ] = useState( ideas )
    const ref = useRef();

    useEffect( () => {
        contentRef.current?.focus();
    }, [ ideaContent ] );

    const sendIdea = () => {
        setLoading( true )
        /*TODO send idea */
        setIdeaContent( '' )
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