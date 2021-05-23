import Link from 'next/link';
import Details from './Details';
import { container, moreBtn, title } from '../../styles/PostExcerpt.module.css';

function PostExcerpt({ post, setPosts }) {

    const handleDelete = () => setPosts(prev => prev.filter(p => p._id !== post._id));

    return (
        <div key={post._id} className={container}>
            <Details {...{ post, handleDelete }} />
            <Link href={`/posts/${post._id}`}>
                <a><h2 className={title}>{post.title}</h2></a>
            </Link>
            <p>{post.excerpt}</p>
            <Link href={`/posts/${post._id}`}>
                <a className={moreBtn}>Read more →</a>
            </Link>
        </div>
    );
}

export default PostExcerpt;