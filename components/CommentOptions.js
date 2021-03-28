import Options from './Options';
import { options, option } from '../styles/Options.module.css';

function CommentOptions({ _id, token, setComments }) {

    const edit = async toggle => {
    };

    const remove = async () => {
        const id = _id.toString();

        await fetch(`http://localhost:5000/comments/${id}`, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setComments(prev => prev.filter(com => com._id.toString() !== id));
    };

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
                        onClick={remove}
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