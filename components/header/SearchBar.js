import { useEffect, useRef, useState } from 'react';
import style, { btn, bar, container, fullWidthContainer } from '../../styles/SearchBar.module.css';
import { sectionHeading } from '../../styles/FeedLayout.module.css';
import Link from 'next/link';
import api from '../apiServerUrl';

function SearchBar() {

    const [query, setQuery] = useState('');
    const [userResults, setUserResults] = useState([]);
    const [postResults, setPostResults] = useState([]);

    const [areResultsVisible, setAreResultsVisible] = useState(false);
    const [cancelId, setCancelId] = useState(null);

    const showResults = () => setAreResultsVisible(true);
    const hideResults = () => setAreResultsVisible(false);

    const input = useRef(null);
    const [isBarFullWidth, setIsBarFullWidth] = useState(false);

    const toggleBar = async () => {
        await setIsBarFullWidth(prev => !prev);
        input.current?.focus();
    };

    const handleBlur = e => {
        if (!e.relatedTarget?.dataset.result) {
            hideResults();
            setIsBarFullWidth(false);
        }
    };

    const handleResultClick = () => {
        hideResults();
        setIsBarFullWidth(false);
    };

    // Keep track of latest requests to make sure
    // responses to only those requests are displayed
    const lastUsersReq = useRef();
    const lastPostsReq = useRef();

    useEffect(() => {
        if (cancelId !== null)
            clearTimeout(cancelId);

        if (query) {
            const timeoutId = setTimeout(() => {

                const currentUsersReq = fetch(`${api}/users?username=${query}`)
                    .then(res => res.json())
                    .catch(() => setUserResults([]));

                lastUsersReq.current = currentUsersReq;
                currentUsersReq
                    .then(data => {
                        if (currentUsersReq === lastUsersReq.current && Array.isArray(data))
                            setUserResults(data);
                    });

                const currentPostsReq = fetch(`${api}/posts?title=${query}`)
                    .then(res => res.json())
                    .catch(() => setPostResults([]));

                lastPostsReq.current = currentPostsReq;
                currentPostsReq
                    .then(data => {
                        if (currentPostsReq === lastPostsReq.current && Array.isArray(data))
                            setPostResults(data);
                    });
            }, 150);

            setCancelId(timeoutId);
        } else {
            lastUsersReq.current = null;
            lastPostsReq.current = null;

            setUserResults([]);
            setPostResults([]);
        }

        return () => clearTimeout(cancelId);
    }, [query]);

    const getSearchText = str => (
        <>
            {str.substring(0, query.length)}
            <span className={style.autocompleted}>
                {str.substring(query.length, str.length)}
            </span>
        </>
    );

    return (
        <>
            <div className={isBarFullWidth ? fullWidthContainer : container}>
                <input
                    placeholder="Search Blogg"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={showResults}
                    onBlur={handleBlur}
                    className={bar}
                    ref={input}
                />
                <button className={btn} onClick={toggleBar}>
                    <i className="ri-search-line" />
                </button>
                {
                    areResultsVisible && (!!userResults.length || !!postResults.length) &&
                    <div className={style.results}>
                        {!!userResults.length &&
                            <>
                                <h4 className={sectionHeading}>Users</h4>
                                {userResults.map(user => (
                                    <Link key={user._id} href={`/users/${user.username}`}>
                                        <a onClick={handleResultClick} onBlur={handleBlur} data-result>
                                            {getSearchText(user.username)}
                                        </a>
                                    </Link>
                                ))}
                            </>
                        }
                        {
                            !!postResults.length &&
                            <>
                                <h4 className={sectionHeading}>Posts</h4>
                                {postResults.map(post => (
                                    <Link key={post._id} href={`/posts/${post._id}`}>
                                        <a onClick={handleResultClick} onBlur={handleBlur} data-result>
                                            {getSearchText(post.title)}
                                        </a>
                                    </Link>
                                ))}
                            </>
                        }
                    </div>
                }
            </div>
        </>
    );
}

export default SearchBar;