import TagEditor from './TagEditor';

function PostSubmitSummary({ post, goBack, tags, setTags }) {

    const limitLength = (str, max) => str.length > max ? `${str.substring(0, max - 3)}...` : str;
    const postExcerpt = limitLength(post.paragraphs[0].body, 200);

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{postExcerpt}</p>
            <TagEditor {...{tags, setTags}} />
            <button onClick={goBack}>Cancel</button>
        </div>
    );
}

export default PostSubmitSummary;