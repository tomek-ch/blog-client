import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from './Context';
import { options, option } from '../styles/UserOptions.module.css';

function UserOptions({ toggle, uid }) {

    const { signOut } = useAppContext();
    const router = useRouter()

    const handleClick = () => {
        signOut();
        router.push('/');
    };

    return (
        <div className={options}>
            <Link href="new">
                <a onClick={toggle} className={option} data-link>New post</a>
            </Link>
            <Link href={`/users/${uid}`}>
                <a onClick={toggle} className={option} data-link>Profile</a>
            </Link>
            <Link href="/settings">
                <a onClick={toggle} className={option} data-link>Settings</a>
            </Link>
            <button onClick={handleClick} className={option} data-link>Sign out</button>
        </div>
    );
}

export default UserOptions;