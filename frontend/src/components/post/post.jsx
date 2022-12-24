import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import "./post.css";
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Badge, Avatar, Button, Tag, Image, message } from 'antd';
import SinglePost from '../../pages/postpage/postpage.jsx'
import Postpage from '../../pages/postpage/postpage.jsx';
import { UserContext } from '../UserContext/UserContext';
import LazyLoad from 'react-lazyload';
import loading from '../../assets/loading.png'
import qs from 'qs'

export default function Post ( { authorName, releaseTime, categories, title, digest, image, userPhoto, followed } ) {
    const [ following, setFollowing ] = useState( followed );
    const { data } = useContext( UserContext )
    const handleFollow = () => {
        setFollowing( !following );
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
    const navigate = useNavigate();
    const handleJump = () => {
        fetch( `/api/blog/fetchOne/`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify( {
                author_Name: authorName,
                tit: title
            } ),
        } ).then( res => res.json() ).then( data => {
            fetch(
                data[ 0 ].html.replace( '39.106.5.232', '39.106.5.232:3000/api' ), {
                method: 'get',
                responseType: 'blob'
            } ).then(
                res => {
                    let article = data[ 0 ];
                    console.log( article )
                    res.text().then( html_data => {
                        article.html = html_data;
                        console.log( article.html );
                        navigate( '/postpage', { state: article } )
                    } )
                }
            )
        } )
    }
    const handleClickPhoto = () => {
        navigate( '/profile/' + authorName )
    }
    return (
        <div className="post" >
            <div className="postInfo">
                <div className="authorInfo">
                    <div className="profilePhoto">
                        <div className="AuthorProfile">
                            <Avatar size='large' src={ userPhoto } onClick={ handleClickPhoto } />
                        </div>
                    </div>
                    <div className="authorName">
                        <p>{ authorName }</p>
                    </div>
                    <div className="followButton">{
                        authorName === data.info.username ? "" :
                            <Button type="dashed" onClick={ handleFollow }>{ following ? "Unfollow" : "Follow" } </Button>
                    }
                    </div>
                    <div className="postTime">
                        { releaseTime }
                    </div>
                </div>
                <div className="postCategories">
                    {
                        categories.map(
                            ( category, key ) => {
                                return (
                                    <Tag color="default" className="postCategory" key={ key }>{ category }</Tag>
                                );
                            }
                        )
                    }
                </div>
                <div className="postTitle" onClick={ handleJump }>
                    { title }
                </div>
            </div>
            <div className="postDigest" onClick={ handleJump }>
                { digest }
            </div>
            <LazyLoad placeholder={ <LoadingOutlined style={ { fontSize: '50px', color: '#08c' } } /> }>
                <img className="postImg" src={ image } alt="" />
            </LazyLoad>
        </div >
    )
}
