import { useState, useEffect } from 'react';
import Link from 'next/link';
import CommentDetails from '../comments/CommentDetails';
import { listItem } from '../../styles/YourPosts.module.css';
import api from '../apiServerUrl';

function CommentList({ currentUser }) {

    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentUser?._id)
            fetch(`${api}/comments?author=${currentUser._id}&getPost=true`)
                .then(res => res.json())
                .then(setComments)
                .catch(() => setError('Error retrieving comments'));
    }, [currentUser]);

    if (!currentUser)
        return null;
        
    return error || comments.map(com => (
        <div key={com._id} className={listItem}>
            <Link href={`/posts/${com.post ? com.post._id : com.comment.post}`}>
                <a>
                    <h3>{com.text}</h3>
                    <p>
                        In response to {com.post ? 'post' : 'comment'}: {
                            com.post?.title || com.comment.text
                        }
                    </p>
                </a>
            </Link>
            <CommentDetails
                comment={{ ...com, author: currentUser }}
                editable={false}
            />
        </div>
    ));
}

export default CommentList;