import PostTile from './PostTile';
import PostExcerpt from './PostExcerpt';
import gridStyle from '../../styles/PostGrid.module.css';
import tagStyle from '../../styles/Tags.module.css';
import Link from 'next/link';

function PostGrid({ posts }) {

    // Get 3 different tags and authors
    const tags = [...new Set(posts.reduce((arr, post) => [...arr, ...post.tags], []))].slice(0, 7);

    const authors = posts.reduce((authors, post) => (
        !authors.find(author => author._id.toString() === post.author._id.toString())
            ? [...authors, post.author]
            : authors
    ), []).slice(0, 5);

    return (
        <div className={gridStyle.grid}>
            <div>
                {posts.slice(0, 3).map(post => <PostExcerpt key={post._id} post={post} />)}
            </div>
            <div>
                {posts.slice(3, 7).map(post => <PostTile key={post._id} post={post} />)}
            </div>
            <div>
                <h2>Writers</h2>
                {authors.map(author => (
                    <Link key={author._id} href={`/users/${author._id}`}>
                        <a>
                            <h3>{author.firstName} {author.lastName}</h3>
                            <p>{author.description}</p>
                        </a>
                    </Link>
                ))}
            </div>
            <div>
                <h2>Topics</h2>
                {tags.map(tag => (
                    <Link key={tag} href={`/tagged/${tag}`}>
                        <a className={tagStyle.tag}>{tag}</a>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PostGrid;