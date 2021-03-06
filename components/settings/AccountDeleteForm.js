import { useState } from 'react';
import { form, input } from '../../styles/Form.module.css';
import { btn } from '../../styles/Btn.module.css';
import { useRouter } from 'next/router';
import api from '../apiServerUrl';
import { dangerBtn } from '../../styles/DangerBtn.module.css';

function AccountDeleteForm({currentUser, token, signOut}) {

    const [deletePassword, setDeletePassword] = useState('');
    const [delMsgs, setDelMsgs] = useState([]);

    const router = useRouter();
    const deleteAccount = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`${api}/users/${currentUser._id}`, {
                method: 'delete',
                body: JSON.stringify({ password: deletePassword }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200)
                signOut();
            else if (response.status === 400)
                setDelMsgs((await response.json()));
            else
                setDelMsgs(['There was a network error']);

        } catch {
            setDelMsgs(['There was a network error']);
        }
    };

    return (
        <form onSubmit={deleteAccount} className={form}>
            <h2>Delete account</h2>
            <label>
                Your password
                <input
                    type="password"
                    value={deletePassword}
                    onChange={e => setDeletePassword(e.target.value)}
                    className={input}
                />
            </label>
            <button
                className={dangerBtn}
                disabled={!deletePassword}
            >Delete account</button>
            <ul>
                {delMsgs.map(msg => <li key={msg}>{msg}</li>)}
            </ul>
        </form>
    );
}

export default AccountDeleteForm;