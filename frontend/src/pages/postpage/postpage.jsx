import React from 'react'
import { useLocation } from 'react-router-dom';
import './postpage.css'
import Sidebar from '../../components/sidebar/sidebar'
import Postobject from '../../components/postobject/postobject'
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'

export default function Postpage() {
    let location = useLocation();
    let state = location.state;
    const Article = state == null ? {
        authorName: "default",
        releaseTime: "30 minutes ago",
        categories: [
            "TV",
            "Politics",
            "Novel"
        ],
        title: 'Rhaenyra Targaryen ? Will She make a fine queen?',
        content: "She owned up to her misdeeds. Rhaenys knew that a lot of people misunderstood Rhaenyra’s intentions and had formed a very different opinion. They saw her as the fierce Targaryen princess who wouldn’t mind spilling blood if it came to that. They saw her as a person who wouldn’t mind indulging in immoral activities and mocking the moral compass of society. But Rhaenyra was not the barbarian that people thought her to be. She was flamboyant in her approach, but she had a kind heart999999999999",
        image: rhaenyra_targaryen,
        userPhoto: rhaenyra_targaryen
    } : state;
    return (
        <div className="SinglePost">
            <Postobject
                authorName={Article.authorName}
                releaseTime={Article.releaseTime}
                title={Article.title}
                content={Article.content}
                image={Article.image}
                categories={Article.categories}
            />
            <Sidebar />
        </div>
    )
}
