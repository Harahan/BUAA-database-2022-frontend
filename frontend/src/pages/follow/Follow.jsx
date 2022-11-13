import './follow.css'
import { Tabs, Input } from 'antd'
import React, { useState } from 'react';
import { BookOutlined, ShoppingCartOutlined, BulbOutlined } from '@ant-design/icons'
import Blog from '../../components/blog/Blog'
import GoodList from '../../components/GoodList/GoodList';
import Idea from '../../components/Ideas/Idea';
const { Search } = Input;
export default function Follow() {
    const [search, setSearch] = useState("");
    const onSearch = (value) => {
        console.log(value);
        setSearch(value);
    }
    return (
        <div className="Follow">
            <Tabs
                defaultActiveKey="1"
                tabPosition={"left"}
                items={[
                    {
                        label: (
                            <span>
                                <BookOutlined />
                                Blog
                            </span>
                        ),
                        key: '1',
                        children:
                            <span>
                                <Search
                                    placeholder="input search text"
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                    onSearch={onSearch}
                                />
                                <Blog
                                    follow={true}
                                    search={search}
                                />
                            </span>,
                    },
                    {
                        label: (
                            <span>
                                <ShoppingCartOutlined />
                                Releases
                            </span>
                        ),
                        key: '2',
                        children: <GoodList />,
                    },
                    {
                        label: (
                            <span>
                                <BulbOutlined />
                                Idea
                            </span>
                        ),
                        key: '3',
                        children: <Idea />,
                    },
                ]}
            />
        </div >
    )
}
