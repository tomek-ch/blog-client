import { useState } from 'react';
import { form, input } from '../../styles/Form.module.css';
import { btn } from '../../styles/Btn.module.css';
import { useRouter } from 'next/router';

function AccountDeleteForm({currentUser, token, signOut}) {

    const [deletePassword, setDeletePassword] = useState('');
    const [delMsgs, setDelMsgs] = useState([]);

    const router = useRouter();
    const deleteAccount = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/users/${currentUser._id}`, {
                method: 'delete',
                body: JSON.stringify({ password: deletePassword }),
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                router.replace('/');
                signOut();
            }
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
    );
}

export default AccountDeleteForm;