function Comment({ text, time, author }) {
    return (
        <div>
            <div>{author.firstName} {author.lastName}</div>
            <div>{text}</div>
            <div>{time}</div>
        </div>
    );
}

export default Comment;