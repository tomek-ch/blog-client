import { useState, useEffect } from 'react';
import { form, input, btnRow, asterisk } from '../../styles/Form.module.css';
import { btn } from '../../styles/Btn.module.css';
import api from '../apiServerUrl';
import TextBox from '../TextBox';

function UserInfoForm({ currentUser, setCurrentUser, token }) {

    const [userData, setUserData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        description: '',
    });

    const handleChange = e => {
        const { value, name } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (currentUser?._id) {
            const { username, firstName, lastName, description } = currentUser;
            setUserData({ username, firstName, lastName, description });
        }
    }, [currentUser]);

    const resetData = () => {
        const { username, firstName, lastName, description } = currentUser;
        setUserData({ username, firstName, lastName, description });
    };

    const changedFields = currentUser &&
        Object.keys(userData).filter(field => userData[field] !== currentUser[field]);

    const handleSubmit = async e => {
        e.preventDefault();

        const newData = changedFields.reduce((data, key) => ({ ...data, [key]: userData[key] }), {});
        try {
            const response = await fetch(`${api}/users/${currentUser._id}`, {
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

    return (
        <form onSubmit={handleSubmit} className={form}>
            <h2>Edit profile</h2>
            <label>
                Username<span className={asterisk}>*</span>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    className={input}
                    maxLength="20"
                />
            </label>
            <label>
                First name<span className={asterisk}>*</span>
                <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    className={input}
                    maxLength="20"
                />
            </label>
            <label>
                Last name
                <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    className={input}
                    maxLength="20"
                />
            </label>
            <label>
                Description
                <TextBox
                    name="description"
                    value={userData.description}
                    onChange={handleChange}
                    className={input}
                    maxLength="100"
                />
            </label>
            <div className={btnRow}>
                <button
                    type="submit"
                    className={btn}
                    disabled={!userData.username || !userData.firstName || !changedFields?.length}
                >
                    Save
                </button>
                <button
                    type="reset"
                    onClick={resetData}
                    className={btn}
                    disabled={!changedFields?.length}
                >
                    Reset
                </button>
            </div>
            <ul>{messages.map(msg => <li key={msg}>{msg}</li>)}</ul>
        </form>
    );
}

export default UserInfoForm;