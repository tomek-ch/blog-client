import PostTile from './PostTile';
import PostExcerpt from './PostExcerpt';
import { grid } from '../styles/PostGrid.module.css';

function PostGrid({ posts }) {

    // Get 3 different tags and authors
    const tags = [...new Set(posts.reduce((arr, post) => [...arr, ...post.tags], []))].slice(0, 3);

    const authors = posts.reduce((authors, post) => (
        !authors.find(author => author._id.toString() === post.author._id.toString())
        ? [...authors, post.author]
        : authors
    ), []).slice(0, 3);

    return (
        <div className={grid}>
            <div>
                {posts.slice(0, 2).map(post => <PostExcerpt key={post._id} post={post} />)}
            </div>
            <div>
                {posts.slice(2).map(post => <PostTile key={post._id} post={post} />)}
            </div>
            <div>
                <h2>Writers</h2>
                {authors.map(author => <div key={author._id}>
                    <h3>{author.firstName} {author.lastName}</h3>
                    <p>{author.description}</p>
                </div>)}
            </div>
            <div>
                <h2>Topics</h2>
                {tags.map(tag => <div key={tag}>{tag}</div>)}
            </div>
        </div>
    );
}

export default PostGrid;