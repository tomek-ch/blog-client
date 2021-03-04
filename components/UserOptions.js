import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from './Context';
import { options, option } from '../styles/UserOptions.module.css';

function UserOptions({ toggle }) {

    const { setCurrentUser } = useAppContext();
    const router = useRouter()

    const signOut = () => {
        setCurrentUser(null);
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
            <div onClick={signOut} className={option}>Sign out</div>
        </div>
    );
}

export default UserOptions;