import CtaSection from '../components/CtaSection';
import { useAppContext } from '../components/Context';
import Meta from '../components/Meta';
import PostGrid from '../components/PostGrid';

function MainPage({ posts, error }) {

    const { currentUser } = useAppContext();

    return (
        <>
            <Meta title="Blogg" />
            {!currentUser ? <CtaSection /> : ''}
            {posts ? <PostGrid posts={posts} /> : error}
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