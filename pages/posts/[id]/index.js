import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function Post() {

    const { query: { id } } = useRouter();
    const [post, setPost] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/posts/${id}`)
            .then(res => Promise.all([res.json(), res.status]))
            .then(([ data, status ]) => {
                if (status === 200) setPost(data);
                else setErrors(data);
            })
            .catch(() => setErrors(['A network error occured']));
    }, []);

    return (
        errors.length ?
            <ul>{errors.map(err => <li key={err}>{err}</li>)}</ul> :
            post ?
                <article>
                    <h1>{post.title}</h1>
                    {post.paragraphs.map(p => (
                        <div key={p._id}>
                            <h2>{p.heading}</h2>
                            <p>{p.body}</p>
                        </div>
                    ))}
                    {post.tags.map(tag => <div key={tag}>{tag}</div>)}
                </article>
                : 'Loading...'
    );
}

export default Post;