import { useContext, useEffect, useState } from 'react';
import CtaSection from '../components/CtaSection';
import PostSnippet from '../components/PostSnippet';
import { Context } from '../components/Context';

function MainPage() {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const { currentUser } = useContext(Context);
    const postElements = posts.map(post => <PostSnippet key={post._id} post={post} />);

    useEffect(() => {
        fetch(`http://localhost:5000/posts`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(() => setError('Network error occured'));
    }, []);

    return (
        <>
            {!currentUser ? <CtaSection /> : ''}
            <div className="posts container">
                {posts.length ? postElements : error ? error : 'Loading...'}
            </div>
        </>
    );
}

export default MainPage;