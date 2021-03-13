import TagEditor from './TagEditor';
import TextBox from './TextBox';

function PostSubmitSummary({ post, goBack, tags, setTags, excerpt, setExcerpt }) {
    return (
        <div>
            <h1>{post.title}</h1>
            <TextBox
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="Post excerpt"
            />
            <TagEditor {...{ tags, setTags }} />
            <button onClick={goBack}>Cancel</button>
        </div>
    );
}

export default PostSubmitSummary;