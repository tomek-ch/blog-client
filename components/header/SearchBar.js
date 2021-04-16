import { useEffect, useRef, useState } from 'react';
import style, { btn, bar, container, fullWidthContainer } from '../../styles/SearchBar.module.css';

function SearchBar() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [cancelId, setCancelId] = useState(null);

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


    const input = useRef(null);
    const [isBarFullWidth, setIsBarFullWidth] = useState(false);

    const toggleBar = async () => {
        await setIsBarFullWidth(prev => !prev);
        input.current?.focus();
    };

    return (
        <>
            <div className={isBarFullWidth ? fullWidthContainer : container}>
                <input
                    placeholder="Search Blogg"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className={bar}
                    ref={input}
                />
                <button className={btn} onClick={toggleBar}>🔎</button>
                {
                    !!results.length &&
                    <div className={style.results}>
                        {results.map(user => <div key={user._id}>{user.username}</div>)}
                    </div>
                }
            </div>
        </>
    );
}

export default SearchBar;