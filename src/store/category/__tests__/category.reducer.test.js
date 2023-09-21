import {
    categoriesReducer,
    CATEGORIES_INITIAL_STATE,
} from '../category.reducer';

import {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
} from '../category.action';

describe('Category reducer tests', () => {

    test('fetchCategoriesStart', () => {
        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: true,
        };

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart()))
            .toEqual(expectedState);
    });

    test('fetchCategoriesSuccess', () => {
        const mockCategories = [
            {
                title: 'mens',
                items: [
                    { id: 1, name: 'Product 1' },
                    { id: 2, name: 'Product 2' },
                ],
            },
        ];

        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            categories: mockCategories,
        };

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockCategories)))
            .toEqual(expectedState);
    });

    test('fetchCategoriesFailed', () => {
        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            error: 'error',
        };

        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesFailed('error')))
            .toEqual(expectedState);
    });

});