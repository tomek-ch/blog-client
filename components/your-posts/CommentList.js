import { useState, useEffect } from 'react';
import api from '../apiServerUrl';
import CommentOverview from '../comments/CommentOverview';

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
        return 'Loading...';
    
    if (!comments.length)
        return 'Nothing here yet';
    
    return comments.map(com => (
        <CommentOverview key={com._id} com={{ ...com, author: currentUser }} />
    ));
}

export default CommentList;