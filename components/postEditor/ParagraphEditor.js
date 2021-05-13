import { editor, headingInput, textBox } from '../../styles/PostEditor.module.css';
import TextBox from '../TextBox';
import { forwardRef } from 'react';

const ParagraphEditor = forwardRef(({ paragraph, editParagraph, index }, ref) => (
    <div className={editor} >
        <input
            value={paragraph.heading}
            onChange={editParagraph('heading', index)}
            placeholder="Heading"
            className={headingInput}
            ref={ref}
        />
        <TextBox
            value={paragraph.body}
            onChange={editParagraph('body', index)}
            placeholder="Body"
            className={textBox}
        />
    </div>
));

export default ParagraphEditor;