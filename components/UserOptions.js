import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Context } from './Context';

function UserOptions({ toggle }) {

    const { setCurrentUser } = useContext(Context);
    const router = useRouter()

    const signOut = () => {
        setCurrentUser(null);
        router.push('/');
    };

    return (
        <div className="options">
            <Link href="/profile">
                <a onClick={toggle} className="option">Profile</a>
            </Link>
            <Link href="/settings">
                <a onClick={toggle} className="option">Settings</a>
            </Link>
            <div onClick={signOut} className="option">Sign out</div>
        </div>
    );
}

export default UserOptions;