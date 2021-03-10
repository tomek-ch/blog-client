import Meta from '../../../components/Meta';
import Tags from '../../../components/Tags';
import Details from '../../../components/Details';
import { container } from '../../../styles/Profile.module.css';
import Link from 'next/link';

function Post({ user, posts, error }) {

    if (error) return (
        <div className={container}>
            <Meta title={error} />
            {error}
        </div>
    );

    return (
        <div className={container}>
            <Meta title={`${user.firstName} - Blogg`} />
            <h1>{user.firstName} {user.lastName}</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <Link href={`/posts/${post._id}`}>
                        <a>
                            <h2>{post.title}</h2>
                        </a>
                    </Link>
                    <Details post={post} />
                    <p>{post.paragraphs[0].body}</p>
                    <Tags tags={post.tags} />
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps({ params: { id } }) {
    try {
        const res = await fetch(`http://localhost:5000/users/${id}`);
        const data = await res.json();

        if (res.status === 200) return { props: data };
        else return { props: { error: data[0] } };

    } catch (error) {
        return { props: { error: 'Failed to connect to the server' } };
    }
}

export default Post;