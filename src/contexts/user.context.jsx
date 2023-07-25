import { createContext, useEffect, useReducer } from 'react';
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener
} from '../utils/firebase/firebase.utils';

// create a context for the user
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


// declare actions for the user
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            }
        default:
            throw new Error(`Unknown action type: ${type} in userReducer`);
    }
};

// Setup initial state
const INITIAL_STATE = {
    currentUser: null,
};

// wrap the children with the context
export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    // set up the state with reducer
    const setCurrentUser = (user) => {
        dispatch({
            type: USER_ACTION_TYPES.SET_CURRENT_USER,
            payload: user,
        });
    }

    const { currentUser } = state;

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>;
};