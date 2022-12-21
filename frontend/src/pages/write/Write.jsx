import BlogEditor from "../../components/Editor/BlogEditor";

const Write = () => {

    return (
        <div className="Write">
            <BlogEditor
                oriHtml={ '' }
                oriTitle={ 'Title' }
            />
        </div>
    );
}

export default Write;