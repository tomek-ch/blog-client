import { useState } from 'react';
import style from '../../styles/TagInput.module.css';

function TagEditor({ tags, setTags }) {
    const [tag, setTag] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (tags.length < 5 && !tags.includes(tag)) {
            setTags(prev => [...prev, tag]);
            setTag('');
        }
    };

    const handleChange = e => {
        setTag(e.target.value);
    };

    const removeTag = toRemove => {
        setTags(prev => prev.filter(tag => tag !== toRemove));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Add a tag"
                    value={tag}
                    onChange={handleChange}
                    className={style.tagInput}
                    maxLength="20"
                />
            </form>
            <div className={style.tagList}>
                {tags.map(tag => (
                    <div key={tag} className={style.tag}>
                        <div>{tag}</div>
                        <button onClick={() => removeTag(tag)} className={style.removeBtn}>x</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TagEditor;