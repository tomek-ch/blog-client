import { useState, useEffect } from 'react';
import { form, input } from '../../styles/Form.module.css';
import { btn } from '../../styles/Btn.module.css';

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
        if (currentUser) {
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

        } catch(e) {
            console.log(e);
            setMessages(['There was a network error']);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={form}>
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
            <label>
                Description:
                <textarea
                    name="description"
                    value={userData.description}
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
    );
}

export default UserInfoForm;