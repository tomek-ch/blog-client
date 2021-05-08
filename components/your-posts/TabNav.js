import Link from 'next/link';
import { navBar, navItem, activeTab } from '../../styles/YourPosts.module.css';

function TabNav({ currentTab }) {

    const links = ['published', 'unpublished', 'comments'].map(text =>
        <Link href={`/your-posts/${text}`} key={text}>
            <a className={currentTab === text ? activeTab : navItem}>
                {`${text[0].toUpperCase()}${text.slice(1, text.length)}`}
            </a>
        </Link>
    );

    return (
        <nav className={navBar}>
            {links}
        </nav>
    );
}

export default TabNav;