import Link from 'next/link';
import { useRouter } from 'next/router';
import { options, option } from '../../styles/Options.module.css';
import Options from '../Options';

function UserOptions({ signOut, currentUser }) {

    const router = useRouter()
    const handleClick = () => {
        signOut();
        router.push('/');
    };

    return (
        <Options
            toggleText={isOn => (
                <>
                    {currentUser.username}
                    <i className={`ri-arrow-${isOn ? 'up' : 'down'}-s-fill`} />
                </>
            )}
            optionId="user"
            renderOptions={(toggle, hide) => (
                <div className={options}>
                    <Link href="/new">
                        <a onClick={toggle} onBlur={hide} className={option} data-user>
                            New post
                        </a>
                    </Link>
                    <Link href={`/users/${currentUser.username}`}>
                        <a onClick={toggle} onBlur={hide} className={option} data-user>
                            Profile
                        </a>
                    </Link>
                    <Link href="/settings">
                        <a onClick={toggle} onBlur={hide} className={option} data-user>
                            Settings
                        </a>
                    </Link>
                    <Link href="/your-posts/published">
                        <a onClick={toggle} onBlur={hide} className={option} data-user>
                            Your posts
                        </a>
                    </Link>
                    <button onClick={handleClick} onBlur={hide} className={option} data-user>
                        Sign out
                    </button>
                </div>
            )}
        />
    );
}

export default UserOptions;