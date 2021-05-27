import { titleInput } from '../../styles/PostEditor.module.css';

function TitleInput({ title, setTitle }) {
    return (
        <input
            className={titleInput}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Your post's title"
            maxLength="50"
            autoFocus
        />
    );
}

export default TitleInput;