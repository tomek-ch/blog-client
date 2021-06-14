import { useEffect, useRef, useState } from 'react';
import style, { btn, bar, container, fullWidthContainer } from '../../styles/SearchBar.module.css';
import api from '../apiServerUrl';
import SearchResults from './SearchResults';

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

    const fetchResults = (url, done, lastReq) => {
        const currentReq = fetch(url)
            .then(res => res.json())
            .catch(() => done([]));

        lastReq.current = currentReq;
        currentReq
            .then(data => {
                if (currentReq === lastReq.current && Array.isArray(data))
                    done(data);
            });
    };

    useEffect(() => {
        if (cancelId !== null)
            clearTimeout(cancelId);

        if (query) {
            const timeoutId = setTimeout(() => {
                fetchResults(`${api}/users?username=${query}`, setUserResults, lastUsersReq);
                fetchResults(`${api}/posts?title=${query}`, setPostResults, lastPostsReq);
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
                        <SearchResults
                            results={userResults}
                            title="Users"
                            getPath={user => `/users/${user.username}`}
                            handleClick={handleResultClick}
                            handleBlur={handleBlur}
                            field="username"
                            query={query}
                        />
                        <SearchResults
                            results={postResults}
                            title="Posts"
                            getPath={post => `/posts/${post._id}`}
                            handleClick={handleResultClick}
                            handleBlur={handleBlur}
                            field="title"
                            query={query}
                        />
                    </div>
                }
            </div>
        </>
    );
}

export default SearchBar;