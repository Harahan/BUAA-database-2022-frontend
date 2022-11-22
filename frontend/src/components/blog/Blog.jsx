import './blog.css'
import Post from "../post/post"
import { useState, useEffect } from 'react'

export default function Blog ( { follow, search, tag } ) {
    const [ data, setData ] = useState( [] );
    useEffect( () => {
        fetch( `/api/blog/fetchAll/?follow=${ follow }&tag=${ tag }&search=${ search }` )
            .then( res => res.json() ).then( data => {
                console.log( "fetching" )
                console.log( data )
                setData( data )
            } )
    }, [ search, tag ] )
    return (
        <div className='blogs'>
            { data.map(
                ( blog, key ) => {
                    return (
                        <Post
                            key={ key }
                            authorName={ blog.authorName }
                            releaseTime={ blog.releaseTime }
                            categories={ blog.categories }
                            title={ blog.title }
                            digest={ blog.digest }
                            image={ blog.cover }
                            userPhoto={ blog.userPhoto }
                            followed={ blog.followed }
                        />
                    );
                }
            ) }
        </div>
    )
}
