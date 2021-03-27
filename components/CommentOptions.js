import Options from './Options';
import { options, option } from '../styles/Options.module.css';

function CommentOptions() {

    const edit = toggle => {
        console.log('edit!');
        toggle();
    };

    const remove = toggle => {
        console.log('delete!');
        toggle();
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
                        onClick={() => remove(toggle)}
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