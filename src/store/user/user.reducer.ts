import { AnyAction } from "redux";

import {
    signInFailed,
    signInSuccess,
    signUpFailed,
    signUpSuccess,
    signOutFailed,
    signOutSuccess,
} from './user.action'

import { UserData } from "../../utils/firebase/firebase.utils";

// Define user state object
export type UserState = {
    readonly currentUser: UserData | null,
    readonly isLoading: boolean,
    readonly error: Error | null,
};

// Setup initial state
const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {

    if (signInSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload,
            isLoading: false,
            error: null,
        };
    };

    if (signOutSuccess.match(action)) {
        return {
            ...state,  
            currentUser: null,
            isLoading: false,
            error: null,
        };
    };

    if (signUpSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload.user,
            isLoading: false,
            error: null,
        };
    };

    // All failed actions
    if (signInFailed.match(action) || signOutFailed.match(action) || signUpFailed.match(action)) {
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        };
    };

    return state;

};
