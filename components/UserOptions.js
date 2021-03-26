import Link from 'next/link';
import { useRouter } from 'next/router';
import { options, option } from '../styles/Options.module.css';
import Options from './Options';

function UserOptions({ signOut, currentUser }) {

    const router = useRouter()
    const handleClick = () => {
        signOut();
        router.push('/');
    };

    return (
        <Options
            toggleText={currentUser.username}
            optionId="user"
            renderOptions={toggle => (
                <div className={options}>
                    <Link href="/new">
                        <a onClick={toggle} className={option} data-user>New post</a>
                    </Link>
                    <Link href={`/users/${currentUser._id}`}>
                        <a onClick={toggle} className={option} data-user>Profile</a>
                    </Link>
                    <Link href="/settings">
                        <a onClick={toggle} className={option} data-user>Settings</a>
                    </Link>
                    <button onClick={handleClick} className={option} data-user>Sign out</button>
                </div>
            )}
        />
    );
}

export default UserOptions;