import BlogEditor from "../../components/Editor/BlogEditor";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import qs from 'qs'

const Write = ( props ) => {
    const params = useParams();
    const [ html_content, setHtml_content ] = useState( "" );
    const [ cover, setCover ] = useState( "" );
    const [ tags, setTags ] = useState( [] );
    useEffect(
        () => {
            fetch( `/api/blog/fetchOne/`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: qs.stringify( {
                    author_Name: params.authorName,
                    tit: params.title
                } ),
            } ).then( res => res.json() ).then( data => {
                fetch(
                    data[ 0 ].html.replace( '39.106.5.232', '39.106.5.232:3000/api' ), {
                    method: 'get',
                    responseType: 'blob'
                } ).then(
                    res => {
                        // console.log( res )
                        let article = data[ 0 ];
                        res.text().then( html_data => {
                            article.html = html_data;
                            setCover( article.cover );
                            setTags( data[ 0 ].categories );
                            console.log( data[ 0 ].categories );
                            setHtml_content( article.html );
                            // console.log( article.html )
                        } )
                    }
                )
            } )
        }, [ params ]
    )
    return (
        <div className="Write">
            <BlogEditor
                oriHtml={ params ? html_content : props.oriHtml }
                oriTitle={ params ? params.title : props.oriTitle }
                oriCover={ cover }
                oriTags={ params ? tags : [ 'Technology', 'Food', 'Music', 'Business', 'MoviesTV', 'Sport' ] }
            />
        </div>
    );
}

export default Write;
