import Meta from '../../../components/Meta';
import { container } from '../../../styles/Post.module.css';
import { useAppContext } from '../../../components/Context';
import { useRouter } from 'next/router';
import CommentList from '../../../components/your-posts/CommentList';
import PostList from '../../../components/your-posts/PostList';
import TabNav from '../../../components/your-posts/TabNav';

function YourPosts() {

    const { currentUser, token } = useAppContext();
    const router = useRouter();
    const currentTab = router.query.tab;

    if (!currentUser)
        router.push('/log-in');

    return (
        <div className={container}>
            <Meta title="Your posts" />
            <h1>Your posts</h1>
            <TabNav currentTab={currentTab} />
            {
                currentTab === 'comments'
                    ? <CommentList {...{ currentUser }} />
                    : <PostList {...{ currentUser, token, unpublished: currentTab === 'unpublished' }} />
            }
        </div>
    );
}

export default YourPosts;