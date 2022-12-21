import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Input, Tag, Tooltip, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { i18nChangeLanguage } from '@wangeditor/editor';
import FileSaver from 'file-saver';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import '@wangeditor/editor/dist/css/style.css'
import axios from 'axios'
import qs from 'qs'
import './BlogEditor.css'
import { UserContext } from '../UserContext/UserContext';


export default function BlogEditor ( { oriHtml, oriTitle } ) {
    const [ title, setTitle ] = useState( oriTitle );
    const [ editor, setEditor ] = useState( null );
    const [ tags, setTags ] = useState( [ 'some tag' ] );
    const [ inputVisible, setInputVisible ] = useState( false );
    const [ inputValue, setInputValue ] = useState( '' );
    const [ editInputIndex, setEditInputIndex ] = useState( -1 );
    const [ editInputValue, setEditInputValue ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const [ firstPic, setfirstPic ] = useState( null );
    const [ html, setHtml ] = useState( oriHtml );
    const inputRef = useRef( null );
    const editInputRef = useRef( null );
    const [ messageApi, contextHolder ] = message.useMessage();
    const { data } = useContext( UserContext );
    const navigate = useNavigate();

    i18nChangeLanguage( 'en' )

    const postArticle = () => {
        setLoading( true );
        let formData = new FormData();
        let blob = new Blob( [ html ], {
            type: 'text / plain; charset=utrf - 8'
        } );
        let htmlFile = new window.File( [ blob ], "article.html" );
        console.log( htmlFile );
        formData.append( "html", htmlFile );
        formData.append( "tags", tags );
        formData.append( "title", title );
        formData.append( "cover", firstPic );
        console.log( firstPic );
        axios(
            {
                url: "http://localhost:3000/api/blog/postArticle/",
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData,
            }
        ).then( ( res ) => {
            console.log( res );
            setLoading( false );
            navigate( '/' )
        }
        )
    };

    const toolbarConfig = {}
    const editorConfig = {
        placeholder: 'write your blog...',
        MENU_CONF: {}
    }

    editorConfig.MENU_CONF[ 'uploadImage' ] = {
        async customUpload ( file, insertFn ) {
            let formData = new FormData();
            console.log( file );
            formData.append( 'picture', file );
            console.log( formData.get( 'picture' ) )
            if ( file.size > 264 * 1024 * 1024 ) {
                messageApi.open( {
                    type: 'warning',
                    content: 'File Too Large',
                } );
            } else {
                axios(
                    {
                        url: "http://localhost:3000/api/blog/uploadPicture/",
                        method: "POST",
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: formData
                    }
                ).then(
                    ( res ) => {
                        console.log( res.data.url )
                        insertFn( res.data.url )
                        if ( firstPic === null ) {
                            setfirstPic( res.data.url );
                            console.log( res.data.url );
                        }
                    }
                )
            }
        },
        onBeforeUpload ( file ) {
            return file
        },
        onProgress ( progress ) {
            console.log( 'progress', progress )
        },
        onSuccess ( file, res ) {
            console.log( `${ file.name } succeed`, res )
        },
        onFailed ( file, res ) {
            console.log( `${ file.name } failed`, res )
        },
        onError ( file, err, res ) {
            console.log( `${ file.name } error`, err, res )
        }
    }

    editorConfig.MENU_CONF[ 'uploadVideo' ] = {
        async customUpload ( file, insertFn ) {
            let formData = new FormData();
            console.log( file );
            formData.append( 'video', file );
            console.log( formData.get( 'video' ) )
            if ( file.size > 264 * 1024 * 1024 ) {
                messageApi.open( {
                    type: 'warning',
                    content: 'File Too Large',
                } );
            } else {
                axios(
                    {
                        url: "http://localhost:3000/api/blog/uploadVideo/",
                        method: "POST",
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: formData
                    }
                ).then(
                    ( res ) => {
                        console.log( res.data.url )
                        insertFn( res.data.url )
                    }
                )
            }
        },
        onBeforeUpload ( file ) {
            return file
        },
        onProgress ( progress ) {
            console.log( 'progress', progress )
        },
        onSuccess ( file, res ) {
            console.log( `${ file.name } succeed`, res )
        },
        onFailed ( file, res ) {
            console.log( `${ file.name } failed`, res )
        },
        onError ( file, err, res ) {
            console.log( `${ file.name } error`, err, res )
        }
    }

    useEffect( () => {
        if ( inputVisible ) {
            inputRef.current?.focus();
        }
    }, [ inputVisible ] );
    useEffect( () => {
        editInputRef.current?.focus();
    }, [ inputValue ] );
    const handleClose = ( removedTag ) => {
        const newTags = tags.filter( ( tag ) => tag !== removedTag );
        console.log( newTags );
        setTags( newTags );
    };
    const showInput = () => {
        setInputVisible( true );
    };
    const handleInputChange = ( e ) => {
        setInputValue( e.target.value );
    };
    const handleInputConfirm = () => {
        if ( inputValue && tags.indexOf( inputValue ) === -1 ) {
            setTags( [ ...tags, inputValue ] );
        }
        setInputVisible( false );
        setInputValue( '' );
    };
    const handleEditInputChange = ( e ) => {
        setEditInputValue( e.target.value );
    };
    const handleEditInputConfirm = () => {
        const newTags = [ ...tags ];
        newTags[ editInputIndex ] = editInputValue;
        setTags( newTags );
        setEditInputIndex( -1 );
        setInputValue( '' );
    };

    return (
        <div className="Write">
            <div className="BlogTitle">
                <Typography.Title
                    editable={ {
                        onChange: setTitle,
                    } }
                    style={ {
                        margin: 0,
                    } }
                >
                    { title }
                </Typography.Title>
            </div>
            <div className="BlogTag">
                { tags.map( ( tag, index ) => {
                    if ( editInputIndex === index ) {
                        return (
                            <Input
                                ref={ editInputRef }
                                key={ tag }
                                size="small"
                                className="tag-input"
                                value={ editInputValue }
                                onChange={ handleEditInputChange }
                                onBlur={ handleEditInputConfirm }
                                onPressEnter={ handleEditInputConfirm }
                            />
                        );
                    }
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={ tag }
                            closable={ true }
                            onClose={ () => handleClose( tag ) }
                        >
                            <span
                                onDoubleClick={ ( e ) => {
                                    if ( index !== 0 ) {
                                        setEditInputIndex( index );
                                        setEditInputValue( tag );
                                        e.preventDefault();
                                    }
                                } }
                            >
                                { isLongTag ? `${ tag.slice( 0, 20 ) }...` : tag }
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={ tag } key={ tag }>
                            { tagElem }
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                } ) }
                { inputVisible && (
                    <Input
                        ref={ inputRef }
                        type="text"
                        size="small"
                        className="tag-input"
                        value={ inputValue }
                        onChange={ handleInputChange }
                        onBlur={ handleInputConfirm }
                        onPressEnter={ handleInputConfirm }
                    />
                ) }
                { !inputVisible && (
                    <Tag className="site-tag-plus" onClick={ showInput }>
                        <PlusOutlined /> New Tag
                    </Tag>
                ) }
            </div>
            <div className="BlogEditor">
                <div style={ { border: '1px solid #ccc', zIndex: 100, marginTop: '15px' } }>
                    <Toolbar
                        editor={ editor }
                        defaultConfig={ toolbarConfig }
                        mode="default"
                        style={ { borderBottom: '1px solid #ccc' } }
                    />
                    <Editor
                        defaultConfig={ editorConfig }
                        value={ html }
                        onCreated={ setEditor }
                        onChange={ editor => setHtml( editor.getHtml() ) }
                        mode="default"
                        style={ { height: '500px' } }
                    />
                </div>
            </div>
            <div className="PostButton">
                <Button
                    size={ "large" }
                    loading={ loading }
                    onClick={ () => postArticle() }
                >
                    POST
                </Button>
            </div>
        </div>

    );
}