import Link from 'next/link';
import Details from './Details';
import Tags from './Tags';

function PostExcerpt({ post, setPosts }) {

    const handleDelete = () => setPosts(prev => prev.filter(p => p._id !== post._id));

    return (
        <div key={post._id}>
            <Link href={`/posts/${post._id}`}>
                <a><h2>{post.title}</h2></a>
            </Link>
            <Details {...{ post, handleDelete }} />
            <p>{post.excerpt}</p>
            <Tags tags={post.tags} />
        </div>
    );
}

export default PostExcerpt;