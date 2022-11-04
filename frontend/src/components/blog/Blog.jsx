import './blog.css'
import Post from "../post/post"
import rhaenyra_targaryen from '../../assets/rhaenyra_targaryen.jpg'

export default function blog () {

    const Blogs = [
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
    ];


    return (
        <div className='blogs'>
            {
                Blogs.map(
                    ( blog, key ) => {
                        return (
                            <Post
                                key={ key }
                                authorName={ blog.authorName }
                                releaseTime={ blog.releaseTime }
                                categories={ blog.categories }
                                title={ blog.title }
                                digest={ blog.digest }
                                image={ blog.image }
                                userPhoto={ blog.userPhoto }
                            />
                        );
                    }
                )
            }
        </div>
    )
}
