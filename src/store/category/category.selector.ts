import { createSelector } from "reselect";

import { RootState } from '../store'
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) : CategoryMap=>
        categories.reduce((acc, { title, items }) => {
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoryMap)
);

// Add categories is loading selector to use with spinner
export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);