function Post({ post, error }) {
    return (
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
            : error
    );
}

export async function getServerSideProps({ params: { id } }) {
    try {
        
        const res = await fetch(`http://localhost:5000/posts/${id}`);
        const data = await res.json();

        if (res.status === 200) return { props: { post: data }, };
        else throw data[0];

    } catch (error) {
        return { props: { error } };
    }
}

export default Post;