import { useState } from 'react';
import { editor, titleInput, headingInput, textBox } from '../styles/PostEditor.module.css';
import TextBox from './TextBox';
import SubmitPostModal from './SubmitPostModal';

function PostEditor() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postPreview, setPostPreview] = useState({});
    const [title, setTitle] = useState('');
    const [paragraphs, setParagraphs] = useState([{ heading: '', body: '' }]);

    const canAddParagraph = paragraphs[paragraphs.length - 1].body;
    // Post must have a title and at least one valid paragraph
    // Paragraphs can't have empty bodies
    // If the last paragraph has only a heading you can't submit
    const canSubmitPost = title
        && paragraphs[0].body
        && !(paragraphs[paragraphs.length - 1].heading
            && !paragraphs[paragraphs.length - 1].body);

    const addParagraph = () => {
        if (canAddParagraph)
            setParagraphs(prev => [...prev, { heading: '', body: '' }]);
    };

    // Returns an event handler that changes either the heading or the body of a paragraph
    // Removes paragraphs with empty bodies that are in the middle of the array 
    const editParagraph = (key, idx) => e => setParagraphs(prev => prev.map((p, i) => (
        i === idx ? { ...p, [key]: e.target.value } : p
    )).filter((p, idx) => p.body || idx === paragraphs.length - 1));

    const submitPost = () => {
        // Remove trailing empty paragraph and trim text
        const post = {
            title,
            paragraphs: paragraphs.flatMap(p => p.body ? [{
                heading: p.heading.trim(),
                body: p.body.trim(),
            }] : []),
        };
        setPostPreview(post);
        setIsModalOpen(true);
    };

    return (
        <div className={editor}>
            <input
                className={titleInput}
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Your post's title"
            />
            {paragraphs.map((p, i) => (
                <div key={`paragraph-${i}`} className={editor} >
                    <input
                        value={p.heading}
                        onChange={editParagraph('heading', i)}
                        placeholder="Heading"
                        className={headingInput}
                    />
                    <TextBox
                        value={p.body}
                        onChange={editParagraph('body', i)}
                        placeholder="Body"
                        className={textBox}
                    />
                </div>
            ))}
            <button
                onClick={addParagraph}
                disabled={!canAddParagraph}
            >
                Add paragraph
            </button>
            <button
                onClick={submitPost}
                disabled={!canSubmitPost}
            >
                Submit post
            </button>
            {isModalOpen && <SubmitPostModal
                post={postPreview}
                closeModal={() => setIsModalOpen(false)}
            />}
        </div>
    );
}

export default PostEditor;