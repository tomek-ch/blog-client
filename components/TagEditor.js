import { useState } from 'react';

function TagEditor({ tags, setTags }) {
    const [tag, setTag] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!tags.includes(tag)) {
            setTags(prev => [...prev, tag]);
            setTag('');
        }
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
                    onChange={e => setTag(e.target.value)}
                />
            </form>
            <div>
                {tags.map(tag => (
                    <div key={tag}>
                        <div>{tag}</div>
                        <button onClick={() => removeTag(tag)}>x</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TagEditor;