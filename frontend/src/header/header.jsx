import './header.css'
import wallpaper from '../assets/wallpaper.jpg'

export default function header () {
    return (
        <div className='Header'>
            <div className='headerTitle'>
                <span className='headerTitleitemUp'>xxx</span>
                <span className='headerTitleitemDown'>Blog</span>
            </div>
            <img className='headerImg'
                src={ wallpaper }
                alt=""
            />
        </div>
    )
}
