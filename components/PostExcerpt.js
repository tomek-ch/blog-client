import Link from 'next/link';
import Details from './Details';
import Tags from './Tags';
import style from '../styles/Post.module.css';

function PostExcerpt({ post }) {
    return (
        <div key={post._id} className={style.container}>
            <Link href={`/posts/${post._id}`}>
                <a><h2>{post.title}</h2></a>
            </Link>
            <Details post={post} />
            <p>{post.paragraphs[0].body}</p>
            <Tags tags={post.tags} />
        </div>
    );
}

export default PostExcerpt;