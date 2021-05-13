import { titleInput } from '../../styles/PostEditor.module.css';
import { useRef, useEffect } from 'react';

function TitleInput({ title, setTitle }) {

    const input = useRef(null);
    useEffect(() => {
        input.current?.focus();
    }, [input]);

    return (
        <input
            className={titleInput}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Your post's title"
            maxLength="50"
            ref={input}
        />
    );
}

export default TitleInput;