import './home.css'
import Header from '../../components/header/header'
import Blog from '../../components/blog/Blog'
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
