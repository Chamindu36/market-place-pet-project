import * as reactRedux from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/test/test.utils';
import { SignOutStart } from '../../../store/user/user.action';
import Navigation from '../navigation.component';

describe('Navigation tests', () => {

    test('It should render a Sign In link if there is no currentUser', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: null,
                },
            },
        });

        expect(screen.getByText('SIGN IN')).toBeInTheDocument();
    });

    test('It should not render Sign In if there is a currentUser', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {},
                },
            },
        });

        expect(screen.queryByText('SIGN IN')).toBeNull();
    });

    test('It should render Sign Out if there is a currentUser', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {},
                },
            },
        });

        expect(screen.getByText('SIGN OUT')).toBeInTheDocument();
    });

    test('It should render cart dropdown if isCartOpen is true', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: [],
                },
            },
        });

        expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    });

    test('It should not render a cart dropdown if isCartOpen is false', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: [],
                },
            },
        });

        expect(screen.queryByText('Your cart is empty')).toBeNull();
    });

    test('It should dispatch SignOutStart when Sign Out is clicked', () => {
        const mockDispatch = jest.fn();
        jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch);

        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {},
                },
            },
        });

        const signOutButton = screen.getByText('SIGN OUT');
        fireEvent.click(signOutButton);

        const signoutAction = SignOutStart();
        expect(mockDispatch).toHaveBeenCalledWith(signoutAction);
        mockDispatch.mockClear();
    }
    );
});