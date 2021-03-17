import { useState } from 'react';
import TagEditor from './TagEditor';
import TextBox from './TextBox';
import { editor } from '../styles/PostEditor.module.css';

function PostSubmitSummary({ post, goBack, tags, setTags, excerpt, setExcerpt, isPublished, setIsPublished, submitCb }) {
    const [error, setError] = useState('');

    const handleClick = async () => {
        const data = {
            ...post,
            tags,
            isPublished,
            excerpt,
        };
        await submitCb(data, setError);
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
                    checked={isPublished}
                    onChange={() => setIsPublished(prev => !prev)}
                />
                Publish post after saving
            </label>
            <div>{error}</div>
            <button onClick={handleClick}>Save</button>
            <button onClick={goBack}>Cancel</button>
        </div>
    );
}

export default PostSubmitSummary;