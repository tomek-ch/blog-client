import CommentForm from './CommentForm';
import Link from 'next/link';

function AddCommentForm({ currentUser, post, token }) {

    if (!currentUser)
        return (
            <Link href="/log-in">
                <a>Sign in to comment</a>
            </Link>
        );

    return (
        <CommentForm
            responseTo={{ post }}
            token={token}
        />
    );
}

export default AddCommentForm;