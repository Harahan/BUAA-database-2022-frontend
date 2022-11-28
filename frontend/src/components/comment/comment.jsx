import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'
import { useState } from 'react'
import './comment.css'
function Comment() {
    const formatDate = (time) => {
        return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
    }
    const [state, setState] = useState({
        // hot: 热度排序  time: 时间排序
        tabs: [
            {
                id: 1,
                name: '热度',
                type: 'hot'
            },
            {
                id: 2,
                name: '时间',
                type: 'time'
            }
        ],
        active: 'hot',
        list: [
            {
                id: 1,
                author: '刘德华',
                comment: '给我一杯忘情水',
                time: new Date('2021-10-10 09:09:00'),
                // 1: 点赞 0：无态度 -1:踩
                attitude: 1
            },
            {
                id: 2,
                author: '周杰伦',
                comment: '哎哟，不错哦',
                time: new Date('2021-10-11 09:09:00'),
                // 1: 点赞 0：无态度 -1:踩
                attitude: 0
            },
            {
                id: 3,
                author: '五月天',
                comment: '不打扰，是我的温柔',
                time: new Date('2021-10-11 10:09:00'),
                // 1: 点赞 0：无态度 -1:踩
                attitude: -1
            }
        ]
    })
    const toggleTab = (curActive) => {
        setState({
            ...state,
            active: curActive
        })
    }
    const textChange = (e) => {
        setState({
            ...state,
            msg: e.target.value
        })
    }
    const addComment = () => {
        setState({
            ...state,
            list: [...state.list, {
                id: 4,
                author: '刘德华',
                comment: state.msg,
                time: new Date('2021-10-10 09:09:00'),
                attitude: 0
            }]
        })
    }
    const delComment = (id) => {
        setState({
            ...state,
            list: state.list.filter(item => item.id !== id)
        })
    }
    return (
        <div className="App">
            <div className="comment-container">
                <div className="comment-head">
                    <span>5 评论</span>
                </div>
                <div className="tabs-order">
                    <ul className="sort-container">
                        {
                            state.tabs.map(tab => (
                                <li
                                    key={tab.id}
                                    className={tab.type === state.active ? 'on' : ''}
                                    onClick={() => toggleTab(tab.type)}
                                >按{tab.name}排序</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="comment-send">
                    <div className="user-face">
                        <img className="user-head" src={rhaenyra_targaryen} alt="" />
                    </div>
                    <div className="textarea-container">
                        <textarea
                            cols="80"
                            rows="5"
                            placeholder="发条友善的评论"
                            className="ipt-txt"
                            value={state.msg}
                            onChange={textChange}
                        />
                        <button className="comment-submit" onClick={addComment}>发表评论</button>
                    </div>
                </div>
                <div className="comment-list">
                    {
                        state.list.map(item => (
                            <div className="list-item" key={item.id}>
                                <div className="user-face">
                                    <img className="user-head" src={rhaenyra_targaryen} alt="" />
                                </div>
                                <div className="comment">
                                    <div className="user">{item.author}</div>
                                    <p className="text">{item.comment}</p>
                                    <div className="info">
                                        <span className="time">{formatDate(item.time)}</span>
                                        <span className={item.attitude === 1 ? 'like liked' : 'like'}>
                                            <i className="icon" />
                                        </span>
                                        <span className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                                            <i className="icon" />
                                        </span>
                                        <span className="reply btn-hover" onClick={() => delComment(item.id)}>删除</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>)
}
export default Comment;