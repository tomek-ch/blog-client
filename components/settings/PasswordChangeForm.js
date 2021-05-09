import { useState } from 'react';
import { form, input } from '../../styles/Form.module.css';
import { btn } from '../../styles/Btn.module.css';
import api from '../apiServerUrl';

function PasswordChangeForm({ token, currentUser }) {

    const [oldPassword, setOldPassword] = useState('');
    const [passMsgs, setPassMsgs] = useState([]);
    const [newPassword, setNewPassword] = useState('');

    const changePassword = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`${api}/users/${currentUser._id}`, {
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

    return (
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
    );
}

export default PasswordChangeForm;