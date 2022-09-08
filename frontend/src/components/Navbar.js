import React from 'react'
import {Link} from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {
  return (
    <div className='PageHeader'>
        <Link className='text-link' to='/'><h1>小航搜题</h1></Link>
        <ul className='menu'>
            <li>
                <Link className='text-link' to='/users'>用户</Link>
            </li>
            <li>
                <Link className='text-link' to='/history'>历史记录</Link>
            </li>
            <li>
                <Link className='text-link' to='/exercises'>题库</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar