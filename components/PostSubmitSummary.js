import TagEditor from './TagEditor';
import TextBox from './TextBox';

function PostSubmitSummary({ post, goBack, tags, setTags, excerpt, setExcerpt, isVisible, setIsVisible }) {
    return (
        <div>
            <h1>{post.title}</h1>
            <TextBox
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="Post excerpt"
            />
            <TagEditor {...{ tags, setTags }} />
            <label>
                Publish post after saving
            <input
                    type="checkbox"
                    value={isVisible}
                    onChange={() => setIsVisible(prev => !prev)}
                />
            </label>
            <button onClick={goBack}>Cancel</button>
        </div>
    );
}

export default PostSubmitSummary;