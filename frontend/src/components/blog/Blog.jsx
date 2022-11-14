import './blog.css'
import Post from "../post/post"
import { useState, useEffect } from 'react'

export default function Blog({ follow, search, tag }) {
    const [data, setData] = useState([]);
    useEffect(() => {
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
        var curtag = null
        if (tag.indexOf('#') != -1 || tag.indexOf('+') != -1 ||
            tag.indexOf('/') != -1 || tag.indexOf('?') != -1 || tag.indexOf('%') != -1 ||
            tag.indexOf('&') != -1 || tag.indexOf('=') != -1 || tag.indexOf(' ') != -1) {
            curtag = tag.replace(/([\#|\+|\/|\?|\%|\#|\&|\=| ])/g, function ($1) {
                return encodeURIComponent($1)
            })
        } else {
            curtag = tag;
        }
        fetch(`/api/blog/fetchAll/?follow=${follow}&tag=${curtag}&search=${cursearch}`)
            .then(res => res.json()).then(data => {
                console.log("fetching")
                //console.log(data)
                setData(data)
            })
    }, [search, tag])
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
