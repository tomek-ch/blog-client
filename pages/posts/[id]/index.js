import CommentForm from '../../../components/comments/CommentForm';
import { useAppContext } from '../../../components/Context';
import Details from '../../../components/posts/Details';
import Meta from '../../../components/Meta';
import Tags from '../../../components/posts/Tags';
import style from '../../../styles/Post.module.css';
import Link from 'next/link';
import { useState } from 'react';
import Comment from '../../../components/comments/Comment';

function Post({ post, comments, error }) {

    if (error)
        return (
            <div className={style.container}>
                <Meta title={`${error} - Blogg`} />
                {error}
            </div>
        );

    const [currentComments, setCurrentComments] = useState(comments);
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
                setCurrentComments(prev => [{ ...data, author: currentUser }, ...prev]);
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
            {currentComments.map(comment => <Comment
                key={comment._id}
                {...{ comment, token, currentUser }}
                setComments={setCurrentComments}
                editable={currentUser?._id.toString() === comment.author._id}
            />)}
        </div>
    );
}

export async function getServerSideProps({ params: { id } }) {
    try {
        const [post, comments] = await Promise.all([
            fetch(`http://localhost:5000/posts/${id}`).then(res => res.json()),
            fetch(`http://localhost:5000/comments?post=${id}`).then(res => res.json()),
        ]);

        return {
            props: {
                post,
                comments,
            },
        };

    } catch {
        return { props: { error: 'Failed to connect to the server' } };
    }
};

export default Post;