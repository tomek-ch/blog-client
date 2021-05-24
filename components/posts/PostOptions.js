import Link from 'next/link';
import { option, options } from '../../styles/Options.module.css';
import { useAppContext } from '../Context';
import Options from '../Options';
import api from '../apiServerUrl';

function PostOptions({ id, handleDelete }) {

    const { token } = useAppContext();

    const deletePost = async () => {
        await fetch(`${api}/posts/${id}`, {
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
            renderOptions={(_toggle, hide) => (
                <div className={options}>
                    <Link href={`/posts/${id}/edit`}>
                        <a className={option} data-post onBlur={hide}>Edit</a>
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