import './home.css'
import Header from '../../components/header/header'
import Blog from '../../components/blog/Blog'
import Sidebar from '../../components/sidebar/sidebar'
import React, { useState } from 'react';
import { Input } from 'antd'
const { Search } = Input;
export default function Home () {
    const [ search, setSearch ] = useState( "" );
    const [ tag, setTag ] = useState( "" );
    const onSearch = ( value ) => {
        setSearch( value );
        console.log( value );
    }
    const onTag = ( value ) => {
        setTag( value );
        console.log( value );
    }
    return (
        <div >
            <Header />
            <Search
	    	className="search"
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={ onSearch }
            />
            <div className='Home'>
                <Blog
                    follow={ false }
                    search={ search }
                    tag={ tag }
                />
                <Sidebar
                    click={ onTag }
                />
            </div>
        </div>
    )
}
