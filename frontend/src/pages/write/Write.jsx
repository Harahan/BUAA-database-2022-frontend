import BlogEditor from "../../components/Editor/BlogEditor";
import { useParams } from 'react-router-dom';
import { useState } from "react";

import qs from 'qs'

const Write = ( props ) => {
    const params = useParams();
    const [ html_content, setHtml_content ] = useState( "" );
    const [ cover, setCover ] = useState( "" );
    fetch( `/api/blog/fetchOne/`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: qs.stringify( {
            author_Name: params.authorName,
            tit: params.title
        } ),
    } ).then( res => res.json() ).then( data => {
        fetch(
            data[ 0 ].html.replace( '39.106.5.232', 'localhost:3000/link' ), {
            method: 'get',
            responseType: 'blob'
        } ).then(
            res => {
                // console.log( res )
                let article = data[ 0 ];
                res.text().then( html_data => {
                    article.html = html_data;
                    setCover( article.cover );
                    setHtml_content( article.html );
                    // console.log( article.html )
                } )
            }
        )
    } )
    return (
        <div className="Write">
            <BlogEditor
                oriHtml={ params ? html_content : props.oriHtml }
                oriTitle={ params ? params.title : props.oriTitle }
                oriCover={ cover }
            />
        </div>
    );
}

export default Write;