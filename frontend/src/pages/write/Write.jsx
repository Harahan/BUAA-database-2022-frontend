import { useState, useEffect, useRef } from 'react';
import { Typography, Input, Tag, Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { i18nChangeLanguage } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css'
import axios from 'axios'
import './write.css'

const Write = () => {
    const [ title, setTitle ] = useState( 'Title' );
    const [ editor, setEditor ] = useState( null );
    const [ tags, setTags ] = useState( [ 'some tag' ] );
    const [ inputVisible, setInputVisible ] = useState( false );
    const [ inputValue, setInputValue ] = useState( '' );
    const [ editInputIndex, setEditInputIndex ] = useState( -1 );
    const [ editInputValue, setEditInputValue ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const [ firstPic, setfirstPic ] = useState( null );
    const [ html, setHtml ] = useState( '' );
    const inputRef = useRef( null );
    const editInputRef = useRef( null );

    i18nChangeLanguage( 'en' )

    const postArticle = () => {
        setLoading( true );
        console.log( html );
        let formData = new FormData();
        formData.append( "html", html );
        formData.append( "tags", tags );
        formData.append( "title", title );
        if ( firstPic ) {
            formData.append( "cover", firstPic );
        }
        axios(
            {
                url: "http://localhost:3000/api/postArticle",
                method: "POST",
                data: formData,
            }
        ).then( ( res ) => {
            setLoading( false );
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
            formData.append( "file", file );
            axios(
                {
                    url: "http://localhost:3000/api/upload",
                    method: "GET",
                    data: formData,
                }
            ).then(
                ( res ) => {
                    insertFn( res.data.url )
                    if ( firstPic === null ) {
                        setfirstPic( res );
                        console.log( res );
                    }
                }
            )
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
                <div className="editor-content-view"
                    dangerouslySetInnerHTML={ { __html: html } }
                />
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

export default Write;