import TagEditor from './TagEditor';
import TextBox from './TextBox';
import { useAppContext } from './Context';

function PostSubmitSummary({ post, goBack, tags, setTags, excerpt, setExcerpt, isVisible, setIsVisible, submitCb }) {

    const{ currentUser: { _id } } = useAppContext();

    const handleClick = async () => {
        const data = {
            ...post,
            tags,
            isPublished: isVisible,
            excerpt,
            author: _id,
        };
        await submitCb(data);
    };

    return (
        <div>
            <h1>{post.title}</h1>
            <TextBox
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="Post excerpt"
            />
            <TagEditor {...{ tags, setTags }} />
            <label>
                Publish post after saving
                <input
                    type="checkbox"
                    value={isVisible}
                    onChange={() => setIsVisible(prev => !prev)}
                />
            </label>
            <button onClick={handleClick}>Save</button>
            <button onClick={goBack}>Cancel</button>
        </div>
    );
}

export default PostSubmitSummary;