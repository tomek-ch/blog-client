import React, { useContext, useEffect, useState } from 'react';
import Nav from '../components/Nav';
import PostThumbnail from '../components/PostThumbnail';
import { Context } from '../Context';

function Dashboard() {

    const { currentUser } = useContext(Context);
    const [posts, setPosts] = useState([]);
    const postElements = posts.map(post => <PostThumbnail key={post._id} post={post} />);

    useEffect(() => {
        fetch(`http://localhost:3000/posts?author=${currentUser._id}`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(console.log);
    }, []);

    return (
        <>
            <h1>Hello {currentUser.username}</h1>
            <Nav user={currentUser} />
            <div>
                {postElements}
            </div>
        </>
    );
}

export default Dashboard;