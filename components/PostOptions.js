import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { option, options, toggle } from '../styles/Options.module.css';
import { useAppContext } from './Context';

function PostOptions({ id }) {

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { token } = useAppContext();

    const deletePost = async () => {
        await fetch(`http://localhost:5000/posts/${id}`, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`,
            },
    });
        router.replace('/');
    };

    const handleBlur = e => {
        if (!e.relatedTarget?.dataset.option)
            setIsOpen(false);
    }

    return (
        <div>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                onBlur={handleBlur}
                className={toggle}
            >...</button>
            {
                isOpen && (
                    <div className={options}>
                        <Link href={`/posts/${id}/edit`}>
                            <a className={option} data-option>Edit</a>
                        </Link>
                        <button onClick={deletePost} className={option} data-option>
                            Delete post
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default PostOptions;