import { useState, useRef } from 'react';
import { editor, btn } from '../../styles/PostEditor.module.css';
import ParagraphEditor from './ParagraphEditor';
import PostSubmitSummary from './PostSubmitSummary';
import TitleInput from './TitleInput';

function PostEditor({ submitCb, post }) {
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [title, setTitle] = useState(post?.title || '');
    const [paragraphs, setParagraphs] = useState(post?.paragraphs || [{ heading: '', body: '' }]);

    const [postPreview, setPostPreview] = useState({});
    const [tags, setTags] = useState(post?.tags || []);
    const [excerpt, setExcerpt] = useState(post?.excerpt || '');
    const [isPublished, setIsPublished] = useState(post ? post.isPublished : true);

    const indexOfLastParagraph = paragraphs.length - 1;
    const lastParagraph = paragraphs[indexOfLastParagraph];
    const canAddParagraph = lastParagraph.body;

    // Post must have a title and at least one valid paragraph
    // Paragraphs can't have empty bodies
    // If the last paragraph has only a heading you can't submit
    const canSubmitPost = title
        && paragraphs[0].body
        && !(lastParagraph.heading
            && !lastParagraph.body);

    const inputRef = useRef();
    const addParagraph = () => {
        setParagraphs(prev => [...prev, { heading: '', body: '' }]);
        inputRef.current?.focus();
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

        if (!excerpt) {
            const limitLength = (str, max) => str.length > max ? `${str.substring(0, max - 3)}...` : str;
            setExcerpt(limitLength(post.paragraphs[0].body, 200));
        }

        setPostPreview(post);
        setIsSummaryOpen(true);
    };

    if (isSummaryOpen) return (
        <PostSubmitSummary
            post={postPreview}
            goBack={() => setIsSummaryOpen(false)}
            {...{ tags, setTags, excerpt, setExcerpt, isPublished, setIsPublished, submitCb }}
        />
    );

    return (
        <div className={editor}>
            <TitleInput {...{ title, setTitle }} />
            {paragraphs.slice(0, -1).map((p, i) => (
                <ParagraphEditor key={`p-${i}`} paragraph={p} index={i} editParagraph={editParagraph} />
            ))}
            <ParagraphEditor
                paragraph={lastParagraph}
                index={indexOfLastParagraph}
                editParagraph={editParagraph}
                ref={inputRef}
            />
            <button
                onClick={addParagraph}
                disabled={!canAddParagraph}
                className={btn}
            >
                Add paragraph
            </button>
            <button
                onClick={submitPost}
                disabled={!canSubmitPost}
                className={btn}
            >
                Submit post
            </button>
        </div>
    );
}

export default PostEditor;