import Meta from '../../../components/Meta';
import Tags from '../../../components/Tags';
import style from '../../../styles/Post.module.css';

function Post({ post, error }) {

    const { readTime } = post;
    const timeToRead = readTime === 0
        ? 'Less than a minute to read'
        : readTime === 1
            ? '1 minute read'
            : `${readTime} minutes read`;

    return (
        post ?
            <article className={style.post}>
                <Meta title={post.title} />
                <h1 className={style.title}>{post.title}</h1>
                <div className={style.details}>
                    {post.time} • {post.author.firstName} {post.author.lastName} • {timeToRead}
                </div>
                {post.paragraphs.map(p => (
                    <div key={p._id} className={style.paragraph}>
                        <h2 className={style.heading}>{p.heading}</h2>
                        <p>{p.body}</p>
                    </div>
                ))}
                <Tags tags={post.tags} />
            </article>
            : <div classsName={style.post}>{error}</div>
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