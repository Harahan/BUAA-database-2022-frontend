import './blog.css'
import Post from "../post/post"
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Blog() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("/api/blog/fetchAll/")
            .then(res => res.json()).then(data => {
                console.log("fetching")
                console.log(data)
                setData(data)
                //setData(data);
            })
    }, []);
    return (
        <div className='blogs'>
            {data.map(
                (blog, key) => {
                    return (
                        <Post
                            key={key}
                            authorName={blog.authorName}
                            releaseTime={blog.releaseTime}
                            categories={[blog.categories, blog.categories]}
                            title={blog.title}
                            digest={blog.digest}
                            image={blog.image}
                            userPhoto={blog.userPhoto}
                        />
                    );
                }
            )}
        </div>
    )
}
