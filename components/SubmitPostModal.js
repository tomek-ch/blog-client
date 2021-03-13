function SubmitPostModal({ post, closeModal }) {

    const limitLength = (str, max) => str.length > max ? `${str.substring(0, max - 3)}...` : str;
    const postExcerpt = limitLength(post.paragraphs[0].body, 50);

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{postExcerpt}</p>
            <button onClick={closeModal}>Cancel</button>
        </div>
    );
}

export default SubmitPostModal;