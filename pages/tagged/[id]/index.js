import Details from '../../../components/Details';
import Meta from '../../../components/Meta';
import Tags from '../../../components/Tags';
import Link from 'next/link';
import style from '../../../styles/Post.module.css';

function PostsTagged({ posts, error }) {

    if (error)
        return (
            <div className={style.post}>
                <Meta title={`${error} - Blogg`} />
                {error}
            </div>
        );

    return (
        posts.map(post => (
            <div className={style.post}>
                <Meta title={post.title} />
                <Link href={`/posts/${post._id}`}>
                    <a><h2>{post.title}</h2></a>
                </Link>
                <Details post={post} />
                <p className={style.paragraph}>{post.paragraphs[0].body}</p>
                <Tags tags={post.tags} />
            </div>
        ))
    );
}

export async function getServerSideProps({ params: { id } }) {
    try {
        const res = await fetch(`http://localhost:5000/posts?tags=${encodeURI(id)}`);
        const data = await res.json();

        if (res.status === 200) return { props: { posts: data } };
        else return { props: { error: data[0] } };

    } catch (error) {
        console.log(error)
        return { props: { error: 'Failed to connect to the server' } };
    }
}

export default PostsTagged;