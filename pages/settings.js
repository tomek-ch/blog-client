import { useAppContext } from '../components/Context';
import Meta from '../components/Meta';
import UserInfoForm from '../components/settings/UserInfoForm';
import PasswordChangeForm from '../components/settings/PasswordChangeForm';
import AccountDeleteForm from '../components/settings/AccountDeleteForm';
import { useRouter } from 'next/router';

function Settings() {

    const { currentUser, token, setCurrentUser, signOut } = useAppContext();
    const router = useRouter();

    if (!currentUser)
        router.push('/log-in');

    return (
        <>
            <Meta title="Edit your profile - Blogg" />
            <UserInfoForm {...{ currentUser, setCurrentUser, token }} />
            <PasswordChangeForm {...{ currentUser, token }} />
            <AccountDeleteForm {...{ currentUser, token, signOut }} />
        </>
    );
}

export default Settings;