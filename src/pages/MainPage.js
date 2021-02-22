import React, { useContext, useEffect, useState } from 'react';
import CtaSection from '../components/CtaSection';
import PostSnippet from '../components/PostSnippet';
import { Context } from '../Context';

function Dashboard() {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const { currentUser } = useContext(Context);
    const postElements = posts.map(post => <PostSnippet key={post._id} post={post} />);

    useEffect(() => {
        fetch(`http://localhost:3000/posts`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(() => setError('Network error occured'));
    }, []);

    return (
        <>
            {!currentUser ? <CtaSection /> : ''}
            <div className="posts">
                {posts.length ? postElements : error ? error : 'Loading...'}
            </div>
        </>
    );
}

export default Dashboard;