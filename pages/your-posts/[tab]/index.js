import Meta from '../../../components/Meta';
import { container } from '../../../styles/Post.module.css';
import { navBar, navItem, activeTab } from '../../../styles/YourPosts.module.css';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../components/Context';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CommentList from '../../../components/your-posts/CommentList';
import PostList from '../../../components/your-posts/PostList';

function YourPosts() {

    const { currentUser, token } = useAppContext();
    const router = useRouter();
    const currentTab = router.query.tab;

    if (!currentUser)
        router.push('/log-in');

    const [data, setData] = useState({

    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser._id) {

            const url =
                currentTab === 'comments'
                    ? `http://localhost:5000/comments?author=${currentUser._id}`
                    : `http://localhost:5000/posts?author=${currentUser._id}`;

            const options =
                currentTab === 'unpublished'
                    ? {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    } : {};

            fetch(url, options)
                .then(res => res.json())
                .then(setData)
                .catch(() => setError('Error retrieving posts'));
        }
    }, [currentUser, currentTab]);

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

    return (
        <div className={container}>
            <Meta title="Your posts" />
            <h1>Your posts</h1>
            <nav className={navBar}>
                {links}
            </nav>
            {
                currentTab === 'comments'
                    ? <CommentList {...{ currentUser }} />
                    : <PostList {...{ currentUser, token, unpublished: currentTab === 'unpublished' }} />
            }
        </div>
    );
}

export default YourPosts;