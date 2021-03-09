import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from './Context';
import { options, option } from '../styles/UserOptions.module.css';

function UserOptions({ toggle }) {

    const { signOut } = useAppContext();
    const router = useRouter()

    const handleClick = () => {
        signOut();
        router.push('/');
    };

    return (
        <div className={options}>
            <Link href="/profile">
                <a onClick={toggle} className={option}>Profile</a>
            </Link>
            <Link href="/settings">
                <a onClick={toggle} className={option}>Settings</a>
            </Link>
            <div onClick={handleClick} className={option}>Sign out</div>
        </div>
    );
}

export default UserOptions;