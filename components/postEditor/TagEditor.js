import { useState } from 'react';
import style from '../../styles/TagInput.module.css';
import { btn } from '../../styles/Btn.module.css';
import { input } from '../../styles/Form.module.css';

function TagEditor({ tags, setTags }) {
    const [tag, setTag] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        setTags(prev => [...prev, tag]);
        setTag('');
    };

    const handleChange = e => {
        setTag(e.target.value);
    };

    const removeTag = toRemove => {
        setTags(prev => prev.filter(tag => tag !== toRemove));
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={style.tagForm}>
                <input
                    placeholder="Add a tag"
                    value={tag}
                    onChange={handleChange}
                    className={input}
                    maxLength="20"
                />
                <button className={btn} disabled={tags.length >= 5 || tags.includes(tag)}>
                    Add
                </button>
            </form>
            <div className={style.tagList}>
                {tags.map(tag => (
                    <div key={tag} className={style.tag}>
                        <div>{tag}</div>
                        <button onClick={() => removeTag(tag)} className={style.removeBtn}>
                            <i className="ri-close-fill" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TagEditor;