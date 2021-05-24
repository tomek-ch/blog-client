import { useState } from 'react';
import TagEditor from './TagEditor';
import TextBox from '../TextBox';
import { editor, btn } from '../../styles/PostEditor.module.css';
import { input } from '../../styles/Form.module.css';

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
            <label>
                Post excerpt (how it will be displayed on your profile etc):
                <TextBox
                    className={input}
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    placeholder="Post excerpt"
                    maxLength="200"
                />
            </label>
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
            <button onClick={handleClick} disabled={!excerpt} className={btn}>
                Save
            </button>
            <button onClick={goBack} className={btn}>
                Cancel
            </button>
        </div>
    );
}

export default PostSubmitSummary;