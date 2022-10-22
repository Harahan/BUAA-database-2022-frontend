import React from 'react'
import './postpage.css'
import Sidebar from '../../components/sidebar/sidebar'
import Postobject from '../../components/postobject/postobject'

export default function Postpage () {
    return (
        <div className="SinglePost">
            <Postobject />
            <Sidebar />
        </div>
    )
}
