import { useContext } from 'react';
import CtaSection from '../components/CtaSection';
import PostSnippet from '../components/PostSnippet';
import { Context } from '../components/Context';
import { postsGrid } from '../styles/Posts.module.css';

function MainPage({ posts, error }) {

    const { currentUser } = useContext(Context);
    const postElements = posts.map(post => <PostSnippet key={post._id} post={post} />);

    return (
        <>
            {!currentUser ? <CtaSection /> : ''}
            <div className={postsGrid}>
                {posts.length ? postElements : error}
            </div>
        </>
    );
}

export async function getServerSideProps() {
    try {
        return {
            props: {
                posts: await (await fetch('http://localhost:5000/posts')).json(),
            }
        }
    } catch (error) {
        return {
            props: {
                posts: [],
                error: await error.json(),
            },
        };
    }
}

export default MainPage;