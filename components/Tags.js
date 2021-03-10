import style from '../styles/Tags.module.css';

function Tags({ tags }) {
    return (
        <div className={style.tags}>
            {tags.map(tag => <div key={tag} className={style.tag}>{tag}</div>)}
        </div>
    );
}

export default Tags;