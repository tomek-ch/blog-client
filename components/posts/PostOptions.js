import Link from 'next/link';
import { option, options } from '../../styles/Options.module.css';
import { useAppContext } from '../Context';
import Options from '../Options';

function PostOptions({ id, handleDelete }) {

    const { token } = useAppContext();

    const deletePost = async () => {
        await fetch(`http://localhost:5000/posts/${id}`, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        handleDelete();
    };

    return (
        <Options
            toggleText="⋯"
            optionId="post"
            renderOptions={() => (
                <div className={options}>
                    <Link href={`/posts/${id}/edit`}>
                        <a className={option} data-post>Edit</a>
                    </Link>
                    <button onClick={deletePost} className={option} data-post>
                        Delete
                    </button>
                </div>
            )}
        />
    );
}

export default PostOptions;