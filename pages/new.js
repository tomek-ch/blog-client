import Meta from '../components/Meta';
import PostEditor from '../components/PostEditor';
import { container } from '../styles/Post.module.css';
import { useRouter } from 'next/router';

function NewPost() {

    const router = useRouter();

    const submitCb = async post => {
        console.log(JSON.stringify(post))
        try {
            const res = await fetch('http://localhost:5000/posts', {
                method: 'post',
                body: JSON.stringify(post),
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.status === 200) {
                const { _id } = await res.json();
                router.push(`/posts/${_id}`);
            } else {
                console.log(await res.json());
            }
        } catch (e) {
            console.log(e);
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