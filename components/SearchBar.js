import { useEffect, useState } from 'react';

function SearchBar() {

    const data = ['apple', 'pineapple', 'banana', 'mango'];

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [cancelId, setCancelId] = useState(null);

    useEffect(() => {
        if (cancelId !== null)
            clearTimeout(cancelId);

        const timeoutId = setTimeout(() => {
            const sanitizedQuery = query.split('').filter(char => /\w/.test(char)).join('');
            if (sanitizedQuery) {
                const regex = new RegExp(sanitizedQuery, 'i');
                setResults(data.filter(item => regex.test(item)));
            } else {
                setResults([]);
            }
        }, 400);

        setCancelId(timeoutId);
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
                {results.map(item => <div key={item}>{item}</div>)}
            </div>
        </form>
    );
}

export default SearchBar;