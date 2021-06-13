import style from '../../styles/YourPosts.module.css';
import Link from 'next/link';
import CommentDetails from './CommentDetails';
import limitLength from '../limitLength';

function CommentOverview({ com }) {

    const text = limitLength(com.text, 100);
    const responseTo = limitLength(com.post?.title || com.comment.text, 50);
    const commentId = com.post ? com._id : com.comment._id;

    return (
        <div className={style.listItem}>
            <Link href={`/posts/${com.post ? com.post._id : com.comment.post}#${commentId}`}>
                <a className={style.link}>
                    <p className={style.comment}>{text}</p>
                    <p className={style.details}>
                        In response to {com.post ? 'post' : 'comment'}: <span className={style.responseTo}>
                            {responseTo}
                        </span>
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