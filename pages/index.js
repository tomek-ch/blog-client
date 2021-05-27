import CtaSection from '../components/CtaSection';
import { useAppContext } from '../components/Context';
import Meta from '../components/Meta';
import PostsFeed from '../components/posts/PostsFeed';
import { container } from '../styles/Post.module.css';
import api from '../components/apiServerUrl';

function MainPage({ posts, error }) {

    const { currentUser } = useAppContext();

    return (
        <>
            <Meta title="Blogg" />
            {!currentUser ? <CtaSection /> : ''}
            {posts ? <PostsFeed posts={posts} /> : <div className={container}>{error}</div>}
        </>
    );
}

export async function getServerSideProps() {
    try {
        const res = await fetch(`${api}/posts`);
        const data = await res.json();

        if (res.status === 200) return { props: { posts: data } };
        else return { props: { error: data[0] } };

    } catch (error) {
        return { props: { error: 'Failed to connect to the server' } };
    }
}

export default MainPage;