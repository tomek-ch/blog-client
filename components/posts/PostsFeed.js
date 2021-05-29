import PostExcerpt from './PostExcerpt';
import style from '../../styles/FeedLayout.module.css';
import tagStyle from '../../styles/Tags.module.css';
import Link from 'next/link';
import { useState } from 'react';

function PostsFeed({ posts }) {

    // Get unique tags and authors
    const tags = [...new Set(posts.reduce((arr, post) => [...arr, ...post.tags], []))].slice(0, 4);

    const authors = posts.reduce((authors, post) => (
        !authors.find(author => author._id.toString() === post.author._id.toString())
            ? [...authors, post.author]
            : authors
    ), []).slice(0, 3);

    const [currentPosts, setCurrentPosts] = useState(posts);

    return (
        <div className={style.container}>
            <div className={style.mainColumn}>
                <h2 className={style.sectionHeading}>Explore posts</h2>
                {currentPosts.map(post => (
                    <PostExcerpt
                        key={post._id}
                        post={post}
                        setPosts={setCurrentPosts}
                    />
                ))}
            </div>
            <div className={style.sidePanel}>
                <div className={style.column}>
                    <h2 className={style.sectionHeading}>Authors</h2>
                    {authors.map(author => (
                        <Link key={author._id} href={`/users/${author.username}`}>
                            <a>
                                <h3>{author.firstName} {author.lastName}</h3>
                                <p>{author.description}</p>
                            </a>
                        </Link>
                    ))}
                </div>
                <div className={style.column}>
                    <h2 className={style.sectionHeading}>Topics</h2>
                    {tags.map(tag => (
                        <Link key={tag} href={`/tagged/${tag}`}>
                            <a className={tagStyle.tag} style={{ display: 'block' }}>{tag}</a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PostsFeed;