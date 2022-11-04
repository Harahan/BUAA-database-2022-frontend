import * as React from "react"
import ReactMde from "react-mde"
import ReactDOM from "react-dom"
import { Typography, Tag } from "antd"
import * as Showdown from "showdown"
import "react-mde/lib/styles/css/react-mde-all.css"
import "./write.css"


const converter = new Showdown.Converter( {
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
} );

export default function Write () {

    const [ value, setValue ] = React.useState( "**Hello world!!!**" );
    const [ selectedTab, setSelectedTab ] = React.useState( "write" );
    const [ title, setTitle ] = React.useState( 'Title' );
    const { CheckableTag } = Tag;
    const tagsData = [ 'Movies', 'Books', 'Music', 'Sports' ];
    const [ selectedTags, setSelectedTags ] = React.useState( [ 'Books' ] );
    const handleChange = ( tag, checked ) => {
        const nextSelectedTags = checked
            ? [ ...selectedTags, tag ]
            : selectedTags.filter( ( t ) => t !== tag );
        console.log( 'You are interested in: ', nextSelectedTags );
        setSelectedTags( nextSelectedTags );
    };

    const save = async function* ( data ) {
        const wait = function ( time ) {
            return new Promise( ( a, r ) => {
                setTimeout( () => a(), time );
            } );
        };

        await wait( 2000 );
        yield "https://picsum.photos/300";/*TODO 换成获取返回图片的链接*/
        await wait( 2000 );
        return true;
    };

    return (
        <div className="writePage">
            <div className="writeTitle">
                <Typography.Title
                    editable={ {
                        tooltip: false,
                        onChange: setTitle,
                    } }
                    level={ 1 }
                    style={ {
                        margin: 0,
                    } }
                >
                    { title }
                </Typography.Title>
            </div>
            <div className="writeTags">
                { tagsData.map( ( tag ) => (
                    <CheckableTag
                        key={ tag }
                        checked={ selectedTags.indexOf( tag ) > -1 }
                        onChange={ ( checked ) => handleChange( tag, checked ) }
                    >
                        { tag }
                    </CheckableTag>
                ) ) }
            </div>
            <div className="writeArea">
                <ReactMde
                    value={ value }
                    onChange={ setValue }
                    selectedTab={ selectedTab }
                    onTabChange={ setSelectedTab }
                    generateMarkdownPreview={ markdown =>
                        Promise.resolve( converter.makeHtml( markdown ) )
                    }
                    childProps={ {
                        writeButton: {
                            tabIndex: -1
                        }
                    } }
                    paste={ {
                        saveImage: save
                    } }
                />
            </div>
        </div>
    )
}
