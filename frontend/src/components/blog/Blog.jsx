import './blog.css'
import Post from "../post/post"
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Blog() {
    const [data, setData] = useState([
        /*
        {
            authorName: "peaceminuczy",
            releaseTime: "30 minutes ago",
            categories: [
                "TV",
                "Politics",
                "Novel"
            ],
            title: 'Rhaenyra Targaryen ? Will She make a fine queen?',
            digest: "She owned up to her misdeeds. Rhaenys knew that a lot of people misunderstood Rhaenyra’s intentions and had formed a very different opinion. They saw her as the fierce Targaryen princess who wouldn’t mind spilling blood if it came to that. They saw her as a person who wouldn’t mind indulging in immoral activities and mocking the moral compass of society. But Rhaenyra was not the barbarian that people thought her to be. She was flamboyant in her approach, but she had a kind heart...",
            image: rhaenyra_targaryen,
            userPhoto: rhaenyra_targaryen
        },
        {
            authorName: "peaceminuczy222",
            releaseTime: "30 minutes ago",
            categories: [
                "TV",
                "Politics",
                "666"
            ],
            title: 'Rhaenyra Targaryen ? Will She make a fine queen?',
            digest: "She owned up to her misdeeds. Rhaenys knew that a lot of people misunderstood Rhaenyra’s intentions and had formed a very different opinion. They saw her as the fierce Targaryen princess who wouldn’t mind spilling blood if it came to that. They saw her as a person who wouldn’t mind indulging in immoral activities and mocking the moral compass of society. But Rhaenyra was not the barbarian that people thought her to be. She was flamboyant in her approach, but she had a kind heart...",
            image: rhaenyra_targaryen,
            userPhoto: rhaenyra_targaryen
        }
        */
    ]);
    useEffect(() => {
        fetch("/api/blog/fetchAll/")
            .then(res => res.json()).then(data => {
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
                            categories={[blog.categories]}
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
