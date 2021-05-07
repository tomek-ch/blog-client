import Meta from '../../../components/Meta';
import { container } from '../../../styles/Post.module.css';
import { navBar, navItem, activeTab, listItem } from '../../../styles/YourPosts.module.css';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../components/Context';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PostDetails from '../../../components/posts/Details';
import CommentDetails from '../../../components/comments/CommentDetails';

function YourPosts() {

    const { currentUser, token } = useAppContext();
    const router = useRouter();
    const currentTab = router.query.tab;

    if (!currentUser)
        router.push('/log-in');

    const [data, setData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser._id)
            fetch(`http://localhost:5000/list-unpublished`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => res.json())
                .then(setData)
                .catch(() => setError('Error retrieving posts'));
    }, [currentUser]);

    if (error)
        return (
            <div className={container}>
                <Meta title={error} />
                {error}
            </div>
        );

    const links = ['published', 'unpublished', 'comments'].map(text =>
        <Link href={`/your-posts/${text}`} key={text}>
            <a className={currentTab === text ? activeTab : navItem}>
                {`${text[0].toUpperCase()}${text.slice(1, text.length)}`}
            </a>
        </Link>
    );

    const items = data?.[currentTab]?.map(item => (
        <Link
            key={item._id}
            href={`/posts/${currentTab === 'comments'
                ? item.post
                    ? item.post
                    : item.comment.post
                : item._id}`}
        >
            <a><h3>{item.text ? item.text : item.title}</h3></a>
        </Link>
    ));

    return (
        <div className={container}>
            <Meta title="Your posts" />
            <h1>Your posts</h1>
            <nav className={navBar}>
                {links}
            </nav>
            {
                currentTab === 'comments'
                    ? data?.comments?.map(com => (
                        <Link href={`/posts/${com.post ? com.post : com.comment.post}`} key={com._id}>
                            <a className={listItem}>
                                <h3>{com.text}</h3>
                                <p>
                                    In response to {com.post ? 'post' : 'comment'}: {
                                        com.post || com.comment._id
                                    }
                                </p>
                                <CommentDetails
                                    comment={{ ...com, author: currentUser }}
                                    editable={false}
                                />
                            </a>
                        </Link>
                    ))
                    : data?.[currentTab]?.map(post => (
                        <div key={post._id} className={listItem}>
                            <Link href={`/posts/${post._id}`}>
                                <a>
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                </a>
                            </Link>
                            <PostDetails
                                post={{ ...post, author: currentUser }}
                                handleDelete={() => setData(prev => ({
                                    ...prev,
                                    [currentTab]: prev[currentTab].filter(p => p._id !== post._id),
                                }))}
                            />
                        </div>
                    ))
            }
        </div>
    );
}

export default YourPosts;