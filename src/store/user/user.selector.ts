import { createSelector } from 'reselect';

import { RootReducer } from '../store'

import { UserState } from './user.reducer';

export const selectUserReducer = (state: RootReducer): UserState => state.user;

export const selectCurrentUser = createSelector(
    selectUserReducer,
    (user) => user.currentUser
);