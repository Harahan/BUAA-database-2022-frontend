import './follow.css'
import { Tabs } from 'antd'
import { BookOutlined, ShoppingCartOutlined, BulbOutlined } from '@ant-design/icons'

export default function Follow () {
    return (
        <div className="Follow">
            <Tabs
                defaultActiveKey="1"
                tabPosition={ "left" }
                items={ [
                    {
                        label: (
                            <span>
                                <BookOutlined />
                                Blog
                            </span>
                        ),
                        key: '1',
                        children: `Content of Tab Pane 1`,
                    },
                    {
                        label: (
                            <span>
                                <ShoppingCartOutlined />
                                Releases
                            </span>
                        ),
                        key: '2',
                        children: `Content of Tab Pane 2`,
                    },
                    {
                        label: (
                            <span>
                                <BulbOutlined />
                                Idea
                            </span>
                        ),
                        key: '3',
                        children: `Content of Tab Pane 3`,
                    },
                ] }
            />
        </div>
    )
}
