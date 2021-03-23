import CtaSection from '../components/CtaSection';
import { useAppContext } from '../components/Context';
import { postsGrid } from '../styles/Posts.module.css';
import Meta from '../components/Meta';
import PostTile from '../components/PostTile';

function MainPage({ posts, error }) {

    const { currentUser } = useAppContext();
    const postElements = posts?.map(post => <PostTile key={post._id} post={post} />);

    return (
        <>
            <Meta title="Blogg" />
            {!currentUser ? <CtaSection /> : ''}
            <div className={postsGrid}>
                {posts ? postElements : error}
            </div>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const res = await fetch('http://localhost:5000/posts');
        const data = await res.json();

        if (res.status === 200) return { props: { posts: data } };
        else return { props: { error: data[0] } };

    } catch (error) {
        return { props: { error: 'Failed to connect to the server' } };
    }
}

export default MainPage;