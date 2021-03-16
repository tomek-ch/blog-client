import TagEditor from './TagEditor';
import TextBox from './TextBox';
import { editor } from '../styles/PostEditor.module.css';

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
        <div className={editor}>
            <h1>{post.title}</h1>
            <TextBox
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="Post excerpt"
            />
            <TagEditor {...{ tags, setTags }} />
            <label>
                <input
                    type="checkbox"
                    value={isPublished}
                    onChange={() => setIsPublished(prev => !prev)}
                />
                Publish post after saving
            </label>
            <button onClick={handleClick}>Save</button>
            <button onClick={goBack}>Cancel</button>
        </div>
    );
}

export default PostSubmitSummary;