import CtaSection from '../components/CtaSection';
import { useAppContext } from '../components/Context';
import PostsFeed from '../components/posts/PostsFeed';
import { container } from '../styles/CtaSection.module.css';
import api from '../components/apiServerUrl';

function MainPage({ posts, error }) {

    const { currentUser } = useAppContext();

    return (
        <>
            {!currentUser && <CtaSection />}
            {posts ? <PostsFeed posts={posts} /> : <div className={container}>{error}</div>}
        </>
    );
}

export async function getServerSideProps() {
    try {
        const res = await fetch(`${api}/posts`);
        const data = await res.json();

        if (res.status === 200) return { props: { posts: data } };
        return { props: { error: data[0] } };

    } catch (error) {
        return { props: { error: 'Failed to connect to the server' } };
    }
}

export default MainPage;
