import React, { useContext, useState, useRef, useEffect } from 'react'
import 'antd/dist/antd.min.css'
import { Button, Tooltip, message, Popover, Table, Input, Space, Avatar } from 'antd'
import { LogoutOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import './chatnav.css'
import axios from 'axios'
import qs from 'qs'
import { UserContext } from '../UserContext/UserContext';
import { ChatContext } from '../ChatContext/ChatContext';
import { useNavigate } from 'react-router-dom'
import { ContactContext } from '../ChatContext/ContactContext';


function ChatNav () {
    const navigate = useNavigate();
    const { data } = useContext( UserContext );
    const { dispatch } = useContext( ChatContext );
    // const { contactdispatch } = useContext( ContactContext );
    const [ contacts, setContacts ] = useState( [] )
    const { Column, ColumnGroup } = Table;
    const [ selectedRowKeys, setSelectedRowKeys ] = useState( [] );
    const [ searchText, setSearchText ] = useState( '' );
    const [ searchedColumn, setSearchedColumn ] = useState( '' );
    const [ selectedName, setSelectedName ] = useState( '' );
    const [ ppl, setPpl ] = useState( 0 );
    const searchInput = useRef( null );
    const hasSelected = selectedRowKeys.length > 0;
    const { Search } = Input;
    const handleSearch = ( selectedKeys, confirm, dataIndex ) => {
        confirm();
        setSearchText( selectedKeys[ 0 ] );
        setSearchedColumn( dataIndex );
    };
    const handleReset = ( clearFilters ) => {
        clearFilters();
        setSearchText( '' );
    };

    const onSelectChange = ( newSelectedRowKeys ) => {
        // console.log( newSelectedRowKeys )
        let selected = "";
        var k;
        var p = 1;
        selected += data.info.username
        for ( k in newSelectedRowKeys ) {
            selected += ",";
            p += 1;
            selected += newSelectedRowKeys[ k ];
        }
        setSelectedRowKeys( newSelectedRowKeys );
        setSelectedName( selected );
        setPpl( p );
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    useEffect(
        () => {
            getContacts();
        }, []
    );

    const getContacts = () => {
        axios(
            {
                url: "http://39.106.5.232:3000/api/user/getContacts/",
                method: "GET",
            }
        ).then( res => {
            let allContacts = res.data.map(
                val => {
                    let user = {};
                    user.username = val.username;
                    user.avatar = val.avatar;
                    user.key = val.username;
                    return user
                }
            )
            setContacts( allContacts )
        } )
    }

    const createChat = ( value ) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: qs.stringify( {
                username: selectedName,
                name: value
            } ),
        };
        console.log( ppl );
        if ( ppl > 2 && value.length === 0 ) {
            alert( "Please input name for the groupchat" )
        } else {
            fetch( "/api/chat/createChat/", requestOptions )
                .then( res => res.json() ).then( data => {
                    console.log( data );
                    dispatch( { type: "change", payload: data } )
                } )
                .then(
                    console.log( dispatch.singleContact )
                )
                .then(
                    axios(
                        {
                            url: "http://39.106.5.232:3000/api/chat/getChats/",
                            method: "GET",
                            prams: {
                                "name": ""
                            }
                        }
                    ).then( res => {
                        console.log( res )
                    } )
                )
        }
    }

    const content = (
        <div>
            <span> { hasSelected ? `Selected ${ selectedRowKeys.length } contacts` : '' }</span>
            <Table
                rowSelection={ rowSelection }
                dataSource={ contacts }>
                <Column
                    title="Name"
                    dataIndex="username"
                    key="username"
                    filterDropdown={ ( { setSelectedKeys, selectedKeys, confirm, clearFilters, close } ) => (
                        <div
                            style={ {
                                padding: 8,
                            } }
                            onKeyDown={ ( e ) => e.stopPropagation() }
                        >
                            <Input
                                ref={ searchInput }
                                placeholder={ `Search ${ "username" }` }
                                value={ selectedKeys[ 0 ] }
                                onChange={ ( e ) => setSelectedKeys( e.target.value ? [ e.target.value ] : [] ) }
                                onPressEnter={ () => handleSearch( selectedKeys, confirm, "username" ) }
                                style={ {
                                    marginBottom: 8,
                                    display: 'block',
                                } }
                            />
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={ () => handleSearch( selectedKeys, confirm, "username" ) }
                                    icon={ <SearchOutlined /> }
                                    size="small"
                                    style={ {
                                        width: 90,
                                    } }
                                >
                                    Search
                                </Button>
                                <Button
                                    onClick={ () => clearFilters && handleReset( clearFilters ) }
                                    size="small"
                                    style={ {
                                        width: 90,
                                    } }
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={ () => {
                                        confirm( {
                                            closeDropdown: false,
                                        } );
                                        setSearchText( selectedKeys[ 0 ] );
                                        setSearchedColumn( "username" );
                                    } }
                                >
                                    Filter
                                </Button>
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={ () => {
                                        close();
                                    } }
                                >
                                    close
                                </Button>
                            </Space>
                        </div>
                    ) }
                    filterIcon={ ( filtered ) => (
                        <SearchOutlined
                            style={ {
                                color: filtered ? '#1890ff' : undefined,
                            } }
                        />
                    ) }
                    onFilter={ ( value, record ) => record[ "username" ].toString().toLowerCase().includes( value.toLowerCase() ) }
                    onFilterDropdownOpenChange={ ( visible ) => {
                        if ( visible ) {
                            setTimeout( () => searchInput.current?.select(), 100 );
                        }

                    } }
                    render={ ( text ) =>
                        searchedColumn === "username" ? (
                            <Highlighter
                                highlightStyle={ {
                                    backgroundColor: '#ffc069',
                                    padding: 0,
                                } }
                                searchWords={ [ searchText ] }
                                autoEscape
                                textToHighlight={ text ? text.toString() : '' }
                            />
                        ) : (
                            text
                        ) }
                />
                <Column
                    title=""
                    dataIndex="avatar"
                    key="avatar"
                    render={ ( avatar ) => (
                        <>
                            <Avatar src={ avatar } />
                        </>
                    ) }
                />
            </Table>
            <div className="createButton">
                <Search
                    placeholder="name for group chat"
                    enterButton="Create"
                    size="large"
                    onSearch={ createChat }
                />
            </div>
        </div>
    );

    return (
        <div className="ChatNav">
            <div className="title">
                Chat
            </div>
            <div className="user">
                <div className="profile">
                    <img className="profilePic" src={ data.info.avatar } data-src="../../assets/loading.png" alt="" />
                    <div className="rightProfile">
                        <div className='userName'>
                            { data.info.username }
                        </div>
                    </div>
                </div>
            </div>
            <Tooltip title="create chat">
                <div className="createChat">
                    <Popover content={ content } >
                        <Button
                            icon={ <PlusCircleOutlined
                                style={ { fontSize: '36px', color: 'white' } }
                            /> }
                            type="ghost"
                            shape="circle"
                            size="large" />
                    </Popover>
                </div>
            </Tooltip>
        </div>
    )
}

export default ChatNav