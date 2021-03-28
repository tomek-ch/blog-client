import Options from './Options';
import { options, option } from '../styles/Options.module.css';

function CommentOptions({ _id, token, setComments, setIsEdited, setError }) {

    const edit = toggle => {
        setIsEdited(true);
        toggle();
    };

    const remove = async () => {
        try {
            const id = _id.toString();
    
            const res = await fetch(`http://localhost:5000/comments/${id}`, {
                method: 'delete',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                setComments(prev => prev.filter(com => com._id.toString() !== id));
            } else {
                setError('Error trying to delete comment');
            }
        } catch {
            setError('Error trying to delete comment');
        }
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