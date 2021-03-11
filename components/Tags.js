import style from '../styles/Tags.module.css';
import Link from 'next/link';

function Tags({ tags }) {
    return (
        <div className={style.tags}>
            {tags.map(tag => (
                <Link
                    href={`/tagged/${tag}`}
                    key={tag}
                >
                    <a className={style.tag}>{tag}</a>
                </Link>
            ))}
        </div>
    );
}

export default Tags;