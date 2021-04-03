import Options from '../Options';
import { options, option } from '../../styles/Options.module.css';
import deleteComment from './api/commentDelete';

function CommentOptions({ _id, token, setComments, setIsEdited, setError }) {

    const edit = toggle => {
        setIsEdited(true);
        toggle();
    };

    const handleRemove = () => deleteComment(_id, token, setComments, setError);

    return (
        <Options
            optionId="comment"
            toggleText="..."
            renderOptions={toggle => (
                <div className={options}>
                    <button
                        className={option}
                        onClick={() => edit(toggle)}
                        data-comment
                    >
                        Edit
                    </button>
                    <button
                        className={option}
                        onClick={handleRemove}
                        data-comment
                    >
                        Delete
                    </button>
                </div>
            )}
        />
    );
}

export default CommentOptions;