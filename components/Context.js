import React, { createContext, useState } from 'react';

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

export { Context, ContextProvider };