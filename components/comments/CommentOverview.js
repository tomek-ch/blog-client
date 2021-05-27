import { listItem } from '../../styles/YourPosts.module.css';
import Link from 'next/link';
import CommentDetails from './CommentDetails';

function CommentOverview({ com }) {
    
    const limitLength = (str, max) => str.length > max ? `${str.substring(0, max - 3)}...` : str;
    const text = limitLength(com.text, 100);

    return (
        <div className={listItem}>
            <Link href={`/posts/${com.post ? com.post._id : com.comment.post}`}>
                <a>
                    <h3>{text}</h3>
                    <p>
                        In response to {com.post ? 'post' : 'comment'}: {
                            com.post?.title || com.comment.text
                        }
                    </p>
                </a>
            </Link>
            <CommentDetails
                comment={com}
                editable={false}
            />
        </div>
    );
}

export default CommentOverview;