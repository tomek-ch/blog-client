import { useEffect, useState } from 'react';

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

    return (
        <form>
            <input
                placeholder="Search Blogg"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <div>
                {results.map(user => <div key={user._id}>{user.username}</div>)}
            </div>
        </form>
    );
}

export default SearchBar;