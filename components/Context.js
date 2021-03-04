import React, { createContext, useState, useContext } from 'react';

const Context = createContext();

function ContextProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null);

    return (
        <Context.Provider value={{
            currentUser,
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