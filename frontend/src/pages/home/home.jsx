import './home.css'
import Header from '../../components/header/header'
import Blog from '../../blog/Blog'
import Sidebar from '../../components/sidebar/sidebar'

export default function home () {
    return (
        <div>
            <Header />
            <div className='Home'>
                <Blog />
                <Sidebar />
            </div>
        </div>
    )
}
