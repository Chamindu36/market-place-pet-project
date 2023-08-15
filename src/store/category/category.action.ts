import {CATEGORIES_ACTION_TYPES, Category} from './category.types';

import { createAction, Action, ActionWithPayload } from '../../utils/reducer/reducer.utils';

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_SUCCESS, Category[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_FAILURE, Error>;

export type CategoryAction = 
| FetchCategoriesStart 
| FetchCategoriesSuccess 
| FetchCategoriesFailed;

export const fetchCategoriesStart = ():FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_START);

export const fetchCategoriesSuccess = (categoriesArray : Category[]) =>
    createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_SUCCESS,
         categoriesArray
    );

export const fetchCategoriesFailed = (error : Error) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORY_FAILURE, error);

