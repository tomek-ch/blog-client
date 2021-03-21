import { useEffect, useState } from 'react';
import { useAppContext } from '../components/Context';
import { btn } from '../styles/Btn.module.css';
import { form, input } from '../styles/Form.module.css';
import Meta from '../components/Meta';
import { useRouter } from 'next/router';

function Settings() {

    const { currentUser, token, setCurrentUser, signOut } = useAppContext();

    const [userData, setUserData] = useState({
        username: '',
        firstName: '',
        lastName: '',
    });

    const [oldPassword, setOldPassword] = useState('');
    const [passMsgs, setPassMsgs] = useState([]);
    const [newPassword, setNewPassword] = useState('');

    const [deletePassword, setDeletePassword] = useState('');
    const [delMsgs, setDelMsgs] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const { username, firstName, lastName } = currentUser;
            setUserData({ username, firstName, lastName });
        }
    }, [currentUser]);

    const [messages, setMessages] = useState([]);

    const handleChange = e => {
        const { value, name } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const resetData = () => {
        const { username, firstName, lastName } = currentUser;
        setUserData({ username, firstName, lastName });
    };

    const changedFields = currentUser &&
        Object.keys(userData).filter(field => userData[field] !== currentUser[field]);

    const handleSubmit = async e => {
        e.preventDefault();

        const newData = changedFields.reduce((data, key) => ({ ...data, [key]: userData[key] }), {});
        try {
            const response = await fetch(`http://localhost:5000/users/${currentUser._id}`, {
                method: 'put',
                body: JSON.stringify(newData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setMessages(['Profile info updated successfully']);
                setCurrentUser(prev => ({ ...prev, ...userData }));
            }
            else if (response.status === 400)
                setMessages((await response.json()));

        } catch {
            setMessages(['There was a network error']);
        }
    };

    const changePassword = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/users/${currentUser._id}`, {
                method: 'put',
                body: JSON.stringify({ oldPassword, newPassword }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200)
                setPassMsgs(['Password updated successfully']);
            else if (response.status === 400)
                setPassMsgs((await response.json()));
            else
                setPassMsgs(['There was a network error']);

        } catch {
            setPassMsgs(['There was a network error']);
        }
    };

    const router = useRouter();
    const deleteAccount = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/users/${currentUser._id}`, {
                method: 'delete',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                router.replace('/');
                signOut();
            }
            else if (response.status === 400)
                setPassMsgs((await response.json()));
            else
                setPassMsgs(['There was a network error']);

        } catch {
            setPassMsgs(['There was a network error']);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={form}>
                <Meta title="Edit your profile - Blogg" />
                <h2>Edit profile</h2>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        className={input}
                    />
                </label>
                <label>
                    First name:
                    <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                        className={input}
                    />
                </label>
                <label>
                    Last name:
                    <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        className={input}
                    />
                </label>
                <button
                    type="submit"
                    className={btn}
                    disabled={!userData.username || !userData.firstName || !changedFields?.length}
                >Save</button>
                <button
                    type="reset"
                    onClick={resetData}
                    className={btn}
                >Reset</button>
                <ul>{messages.map(msg => <li key={msg}>{msg}</li>)}</ul>
            </form>
            <form className={form} onSubmit={changePassword}>
                <h2>Change password</h2>
                <label>
                    Old password:
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        className={input}
                    />
                </label>
                <label>
                    New password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className={input}
                    />
                </label>
                <button
                    className={btn}
                    disabled={!newPassword || !oldPassword || newPassword === oldPassword}
                >Save password</button>
                <ul>
                    {passMsgs.map(msg => <li key={msg}>{msg}</li>)}
                </ul>
            </form>
            <form onSubmit={deleteAccount} className={form}>
                <h2>Delete account</h2>
                <label>
                    Your password:
                    <input
                        type="password"
                        value={deletePassword}
                        onChange={e => setDeletePassword(e.target.value)}
                        className={input}
                    />
                </label>
                <button
                    className={btn}
                    disabled={!deletePassword}
                >Delete account</button>
                <ul>
                    {delMsgs.map(msg => <li key={msg}>{msg}</li>)}
                </ul>
            </form>
        </>
    );
}

export default Settings;