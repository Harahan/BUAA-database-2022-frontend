import { Tabs } from 'antd';
import React from 'react';
import BlogPage from './BlogPage';
import ProductsPage from '../../components/Product/ProductPage';
import Page from './account';
import OtherPage from './other';
import { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../components/UserContext/UserContext';
function Profile() {
    const params = useParams()
    const { data } = useContext(UserContext);
    return (
        <Tabs
            defaultActiveKey="1"
            items={[
                {
                    label: `Blog`,
                    key: '1',
                    children: <BlogPage
                        username={params.name}
                        modifiable={data.status && data.info.username == params.name}
                    />,
                },
                {
                    label: `Shop`,
                    key: '2',
                    children: <ProductsPage/>,
                },
                {
                    label: `Settings`,
                    key: '3',
                    children: data.status && data.info.username == params.name ? <Page /> : <OtherPage username={params.name} />,
                },
            ]}
        />
    )
}

export default Profile