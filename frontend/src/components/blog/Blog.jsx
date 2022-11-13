import './blog.css'
import Post from "../post/post"
import { useState, useEffect } from 'react'

export default function Blog({ follow, search }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log()
        var cursearch = null
        if (search.indexOf('#') != -1 || search.indexOf('+') != -1 ||
            search.indexOf('/') != -1 || search.indexOf('?') != -1 || search.indexOf('%') != -1 ||
            search.indexOf('&') != -1 || search.indexOf('=') != -1 || search.indexOf(' ') != -1) {
            cursearch = search.replace(/([\#|\+|\/|\?|\%|\#|\&|\=| ])/g, function ($1) {
                return encodeURIComponent($1)
            })
        } else {
            cursearch = search;
        }
        fetch(`/api/blog/fetchAll/?follow=${follow}&tag=&search=${cursearch}`)
            .then(res => res.json()).then(data => {
                console.log("fetching")
                //console.log(data)
                setData(data)
            })
    }, [search])
    return (
        <div className='blogs'>
            {data.map(
                (blog, key) => {
                    return (
                        <Post
                            key={key}
                            authorName={blog.authorName}
                            releaseTime={blog.releaseTime}
                            categories={blog.categories}
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
