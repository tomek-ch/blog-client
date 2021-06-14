import { sectionHeading } from '../../styles/FeedLayout.module.css';
import { autocompleted } from '../../styles/SearchBar.module.css';
import Link from 'next/link';

function SearchResults({ results, title, getPath, handleClick, handleBlur, field, query }) {

    const getSearchText = str => (
        <>
            {str.substring(0, query.length)}
            <span className={autocompleted}>
                {str.substring(query.length, str.length)}
            </span>
        </>
    );

    return (
        !!results.length &&
        <>
            <h4 className={sectionHeading}>{title}</h4>
            {results.map(item => (
                <Link key={item._id} href={getPath(item)}>
                    <a onClick={handleClick} onBlur={handleBlur} data-result>
                        {getSearchText(item[field])}
                    </a>
                </Link>
            ))}
        </>
    );
}

export default SearchResults;