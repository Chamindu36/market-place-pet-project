import { createContext, useState } from 'react';

// create a context for the user
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// wrap the children with the context
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>;
};