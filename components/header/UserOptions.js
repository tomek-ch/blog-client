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
            toggleText={currentUser.username}
            optionId="user"
            renderOptions={toggle => (
                <div className={options}>
                    <Link href="/new">
                        <a onClick={toggle} className={option} data-user>
                            <i className="ri-pencil-line"></i>
                            New post
                        </a>
                    </Link>
                    <Link href={`/users/${currentUser._id}`}>
                        <a onClick={toggle} className={option} data-user>
                            <i className="ri-user-3-line" style={{ borderRadius: '10px', border: '1px solid black' }} />
                            Profile
                        </a>
                    </Link>
                    <Link href="/settings">
                        <a onClick={toggle} className={option} data-user>
                            <i className="ri-settings-3-line"></i>
                            Settings
                        </a>
                    </Link>
                    <Link href="/your-posts">
                        <a onClick={toggle} className={option} data-user>
                            <i className="ri-file-list-2-line"></i>
                            Your posts
                        </a>
                    </Link>
                    <button onClick={handleClick} className={option} data-user>
                        <i className="ri-logout-box-r-line"></i>
                        Sign out
                    </button>
                </div>
            )}
        />
    );
}

export default UserOptions;