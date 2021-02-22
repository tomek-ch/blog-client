import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import PostSnippet from '../components/PostSnippet';

function Dashboard() {

    const [posts, setPosts] = useState([]);
    const postElements = posts.map(post => <PostSnippet key={post._id} post={post} />);

    useEffect(() => {
        fetch(`http://localhost:3000/posts`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(console.log);
    }, []);

    return (
        <div>
            {postElements}
        </div>
    );
}

export default Dashboard;