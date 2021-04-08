import Meta from '../../../components/Meta';
import PostEditor from '../../../components/posts/PostEditor';
import { container } from '../../../styles/Post.module.css';
import { useRouter } from 'next/router';
import { useAppContext } from '../../../components/Context';

function NewPost({ error, post }) {

    const router = useRouter();
    const { token, currentUser } = useAppContext();
    
    console.log(currentUser)

    if (!currentUser)
        router.push('/log-in');
        
    if (currentUser && currentUser._id && currentUser._id !== post.author._id)
        router.push('/');

    const submitCb = async (data, handleError) => {
        try {
            const res = await fetch(`http://localhost:5000/posts/${post._id}`, {
                method: 'put',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                router.push(`/posts/${post._id}`);
            } else {
                const data = await res.json();
                handleError(data[0]);
            }
        } catch (e) {
            handleError('Error trying to submit');
        }
    };

    return error || (
        <div className={container}>
            <Meta title={`Editing ${post.title} - Blogg`} />
            <PostEditor {...{ submitCb, post }} />
        </div>
    );
}

export async function getServerSideProps({ params: { id } }) {
    try {
        const res = await fetch(`http://localhost:5000/posts/${id}`);
        const data = await res.json();

        if (res.status === 200) return { props: { post: data.post } };
        else return { props: { error: data[0] } };

    } catch (error) {
        return { props: { error: 'Failed to connect to the server' } };
    }
}

export default NewPost;