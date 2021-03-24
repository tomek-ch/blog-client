import CommentForm from '../../../components/CommentForm';
import { useAppContext } from '../../../components/Context';
import Details from '../../../components/Details';
import Meta from '../../../components/Meta';
import Tags from '../../../components/Tags';
import style from '../../../styles/Post.module.css';
import Link from 'next/link';

function Post({ post, error }) {

    if (error)
        return (
            <div className={style.container}>
                <Meta title={`${error} - Blogg`} />
                {error}
            </div>
        );

    const { currentUser, token } = useAppContext();
    const addComment = async (text, handleError, handleSuccess) => {
        try {
            const res = await fetch('http://localhost:5000/comments', {
                method: 'post',
                body: JSON.stringify({
                    post: post._id,
                    text,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json()

            if (res.status === 200) {
                console.log(data);
                handleSuccess();
            } else {
                handleError(data[0]);
            }
        } catch (e) {
            handleError('Error trying to submit');
        }
    };

    return (
        <div className={style.container}>
            <article>
                <Meta title={post.title} description={post.excerpt} />
                <h1 className={style.title}>{post.title}</h1>
                <Details post={post} />
                {post.paragraphs.map(p => (
                    <div key={p._id} className={style.paragraph}>
                        <h2 className={style.heading}>{p.heading}</h2>
                        <p className={style.paragraphBody}>{p.body}</p>
                    </div>
                ))}
                <Tags tags={post.tags} />
            </article>
            {
                currentUser
                    ? <CommentForm
                        uid={currentUser._id}
                        postId={post._id}
                        handleSubmit={addComment}
                    />
                    : <Link href="/log-in">
                        <a>Sign in to comment</a>
                    </Link>
            }
        </div>
    );
}

export async function getServerSideProps({ params: { id } }) {
    try {
        const res = await fetch(`http://localhost:5000/posts/${id}`);
        const data = await res.json();

        if (res.status === 200) return { props: { post: data } };
        else return { props: { error: data[0] } };

    } catch (error) {
        return { props: { error: 'Failed to connect to the server' } };
    }
}

export default Post;