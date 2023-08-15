import { CATEGORIES_ACTION_TYPES,Category } from './category.types';

import { CategoryAction } from './category.action';

// since reducers only read properties upon change without mutating the properties this readonly is used
export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null
};

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE,
    action = {} as CategoryAction
) => {
    switch (action.type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_START:
            return { ...state, isLoading: true };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_SUCCESS:
            return { ...state, categories: action.payload, isLoading: false };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_FAILURE:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
};