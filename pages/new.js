import Meta from '../components/Meta';
import PostEditor from '../components/posts/PostEditor';
import { container } from '../styles/Post.module.css';
import { useRouter } from 'next/router';
import { useAppContext } from '../components/Context';

function NewPost() {

    const router = useRouter();
    const { token, currentUser } = useAppContext();
    
    if (!currentUser)
        router.push('/log-in');

    const submitCb = async (post, handleError) => {
        try {
            const res = await fetch('http://localhost:5000/posts', {
                method: 'post',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json()

            if (res.status === 200) {
                const { _id } = data;
                router.push(`/posts/${_id}`);
            } else {
                handleError(data[0]);
            }
        } catch (e) {
            handleError('Error trying to submit');
        }
    };

    return (
        <div className={container}>
            <Meta title="New post - Blogg" />
            <PostEditor {...{submitCb}} />
        </div>
    );
}

export default NewPost;