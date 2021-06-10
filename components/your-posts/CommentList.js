import { useState, useEffect } from 'react';
import api from '../apiServerUrl';
import CommentOverview from '../comments/CommentOverview';
import Link from 'next/link';
import { link } from '../../styles/InlineLink.module.css';
import Spinner from '../Spinner';

function CommentList({ currentUser }) {

    if (!currentUser)
        return null;

    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (currentUser?._id)
            fetch(`${api}/comments?author=${currentUser._id}&getPost=true&newest=true`)
                .then(res => res.json())
                .then(data => {
                    setIsLoading(false);
                    setComments(data);
                })
                .catch(() => {
                    setIsLoading(false);
                    setError('Error retrieving comments')
                });
    }, [currentUser]);

    if (error)
        return error;

    if (isLoading)
        return <Spinner />;

    if (!comments.length)
        return (
            <>
                Nothing here yet. <Link href="/">
                    <a className={link}>Explore posts</a>
                </Link>
            </>
        );

    return comments.map(com => (
        <CommentOverview key={com._id} com={{ ...com, author: currentUser }} />
    ));
}

export default CommentList;