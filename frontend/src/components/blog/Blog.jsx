import './blog.css'
import Post from "../post/post"

export default function blog () {
    return (
        <div className='blogs'>
            <Post className='post' />
            <Post className='post' />
            <Post className='post' />
            <Post className='post' />
            <Post className='post' />
            <Post className='post' />
        </div>
    )
}
