import { useEffect, useRef, useState } from 'react';
import style, { btn, bar, container, fullWidthContainer } from '../../styles/SearchBar.module.css';
import Link from 'next/link';

function SearchBar() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
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

    useEffect(() => {
        if (cancelId !== null)
            clearTimeout(cancelId);

        if (query) {
            const timeoutId = setTimeout(async () => {
                try {
                    const res = await fetch(`http://localhost:5000/users?username=${query}`);
                    if (res.status === 200)
                        setResults(await res.json());
                } catch {
                    setResults([]);
                }
            }, 150);

            setCancelId(timeoutId);
        } else {
            setResults([]);
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
                <button className={btn} onClick={toggleBar}>🔎</button>
                {
                    areResultsVisible && !!results.length &&
                    <div className={style.results}>
                        {results.map(user => (
                            <Link key={user._id} href={`/users/${user._id}`}>
                                <a onClick={handleResultClick} data-result>
                                    {user.username}
                                </a>
                            </Link>
                        ))}
                    </div>
                }
            </div>
        </>
    );
}

export default SearchBar;