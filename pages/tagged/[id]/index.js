import Meta from '../../../components/Meta';
import style from '../../../styles/Post.module.css';
import PostExcerpt from '../../../components/PostExcerpt';

function PostsTagged({ posts, error }) {

    if (error)
        return (
            <div className={style.post}>
                <Meta title={`${error} - Blogg`} />
                {error}
            </div>
        );

    return posts.map(post => <PostExcerpt key={post._id} post={post} />);
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