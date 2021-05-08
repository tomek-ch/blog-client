import Meta from '../../../components/Meta';
import { container } from '../../../styles/Post.module.css';
import { navBar, navItem, activeTab } from '../../../styles/YourPosts.module.css';
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