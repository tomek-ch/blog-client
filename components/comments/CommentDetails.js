import { details } from '../../styles/Comment.module.css';
import CommentOptions from './CommentOptions';
import Link from 'next/link';

function CommentDetails({ comment: {
    _id,
    author,
    time
}, editable, setComments, token, setIsEdited, setError }) {
    return (
        <div className={details}>
            <div>
                <Link href={`/users/${author._id}`}>
                    <a className={details}>{author.firstName} {author.lastName}</a>
                </Link> • {time}
            </div>
            {editable && <CommentOptions {...{ setComments, token, _id, setIsEdited, setError }} />}
        </div>
    );
}

export default CommentDetails;