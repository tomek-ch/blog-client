import { editor, headingInput, textBox } from '../../styles/PostEditor.module.css';
import TextBox from '../TextBox';

function ParagraphEditor({ paragraph, editParagraph, index }) {
    return (
        <div className={editor} >
            <input
                value={paragraph.heading}
                onChange={editParagraph('heading', index)}
                placeholder="Heading"
                className={headingInput}
            />
            <TextBox
                value={paragraph.body}
                onChange={editParagraph('body', index)}
                placeholder="Body"
                className={textBox}
            />
        </div>
    );
}

export default ParagraphEditor;