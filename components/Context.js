import { createContext, useState, useContext, useEffect } from 'react';

const Context = createContext();

function ContextProvider({ children }) {

    const [currentUser, setCurrentUser] = useState({});
    const [token, setToken] = useState('');

    const signOut = () => {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        if (window) {
            const token = (localStorage.getItem('token'));
            if (!token)
                setCurrentUser(null);
            setToken(token); 
        }
    }, []);

    useEffect(() => {
        if (token)
            fetch('http://localhost:5000/verify-user', { headers: { 'Authorization': `Bearer ${token}` } })
                .then(user => user.json())
                .then(setCurrentUser)
                .catch(signOut);
    }, [token]);

    const signIn = ({ user, token }) => {
        setCurrentUser(user);
        setToken(token);
        localStorage.setItem('token', token);
    };

    return (
        <Context.Provider value={{
            currentUser,
            signIn,
            signOut,
            token,
            setCurrentUser,
        }}>
            {children}
        </Context.Provider>
    );
}

function useAppContext() {
    return useContext(Context);
}

export { useAppContext, ContextProvider };