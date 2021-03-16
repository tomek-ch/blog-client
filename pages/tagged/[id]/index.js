import Meta from '../../../components/Meta';
import { container } from '../../../styles/Post.module.css';
import PostExcerpt from '../../../components/PostExcerpt';

function PostsTagged({ posts, tag, error }) {

    if (error)
        return (
            <div className={container}>
                <Meta title={`${error} - Blogg`} />
                {error}
            </div>
        );

    return (
        <div className={container}>
            <Meta
                title={`Posts tagged ${tag} - Blogg`}
                description={`Discover internet's best articles about ${tag} on Blogg.`}
            />
            <h1>Posts tagged {tag}</h1>
            {posts.map(post => <PostExcerpt key={post._id} post={post} />)}
        </div>
    );
}

export async function getServerSideProps({ params: { id } }) {
    try {
        const res = await fetch(`http://localhost:5000/posts?tags=${encodeURI(id)}`);
        const data = await res.json();

        if (res.status === 200) return { props: { posts: data, tag: id } };
        else return { props: { error: data[0] } };

    } catch (error) {
        console.log(error)
        return { props: { error: 'Failed to connect to the server' } };
    }
}

export default PostsTagged;