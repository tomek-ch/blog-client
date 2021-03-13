import { useState } from 'react';

function TagEditor({ tags, setTags }) {
    const [tag, setTag] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!tags.includes(tag))
            setTags(prev => [...prev, tag]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={tag}
                    onChange={e => setTag(e.target.value)}
                />
            </form>
            <div>
                {tags.map(tag => <div key={tag}>{tag}</div>)}
            </div>
        </div>
    );
}

export default TagEditor;