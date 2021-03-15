import TagEditor from './TagEditor';
import TextBox from './TextBox';

function PostSubmitSummary({ post, goBack, tags, setTags, excerpt, setExcerpt, isPublished, setIsPublished, submitCb }) {

    const handleClick = async () => {
        const data = {
            ...post,
            tags,
            isPublished,
            excerpt,
        };
        await submitCb(data);
    };

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
                    value={isPublished}
                    onChange={() => setIsPublished(prev => !prev)}
                />
            </label>
            <button onClick={handleClick}>Save</button>
            <button onClick={goBack}>Cancel</button>
        </div>
    );
}

export default PostSubmitSummary;