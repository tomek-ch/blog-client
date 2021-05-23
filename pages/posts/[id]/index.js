import CommentForm from '../../../components/comments/CommentForm';
import { useAppContext } from '../../../components/Context';
import Details from '../../../components/posts/Details';
import Meta from '../../../components/Meta';
import Tags from '../../../components/posts/Tags';
import style from '../../../styles/Post.module.css';
import { useState, useEffect } from 'react';
import Comment from '../../../components/comments/Comment';
import { useRouter } from 'next/router';
import api from '../../../components/apiServerUrl';

function Post({ post, comments, error }) {

    if (error)
        return (
            <div className={style.container}>
                <Meta title={`${error} - Blogg`} />
                {error}
            </div>
        );

    const [currentComments, setCurrentComments] = useState(comments);

    // Sync component state with server side props
    useEffect(() => {
        setCurrentComments(comments);
    }, [comments]);

    const { currentUser, token } = useAppContext();

    const router = useRouter();
    const handleDelete = () => router.replace('/');

    return (
        <div className={style.container}>
            <article className={style.post}>
                <Meta title={post.title} description={post.excerpt} />
                <h1 className={style.title}>{post.title}</h1>
                <Details {...{ handleDelete, post }} />
                {post.paragraphs.map(p => (
                    <div key={p._id} className={style.paragraph}>
                        <h2 className={style.heading}>{p.heading}</h2>
                        <p className={style.paragraphBody}>{p.body}</p>
                    </div>
                ))}
                <Tags tags={post.tags} />
            </article>
            <CommentForm
                responseTo={{ post: post._id }}
                setComments={setCurrentComments}
                {...{ currentUser, token }}
            />
            {currentComments.map(comment => <Comment
                key={comment._id}
                {...{ comment, token, currentUser }}
                setComments={setCurrentComments}
                editable={currentUser?._id === comment.author._id}
            />)}
        </div>
    );
}

export async function getServerSideProps({ params: { id } }) {
    try {
        const res = await fetch(`${api}/posts/${id}`);

        if (res.status === 200) {
            return {
                props: await res.json(),
            };
        } else if (res.status === 404) {
            return { props: { error: 'Post not found' } };
        } else {
            return { props: { error: 'Failed to connect to the server' } };
        }

    } catch {
        return { props: { error: 'Failed to connect to the server' } };
    }
};

export default Post;