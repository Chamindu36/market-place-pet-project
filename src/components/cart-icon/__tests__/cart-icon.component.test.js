import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import CartIcon from "../cart-icon.component";

describe('Cart-Icon tests', () => {

    test('Uses preloaded state to render', () => {
        const preloadedState = [
            {
                id: 1,
                imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                name: 'Sneakers',
                price: 100,
                quantity: 1
            }
        ];

        renderWithProviders(<CartIcon />, {
            preloadedState:
            {
                cart: {
                    cartItems: preloadedState
                }
            }
        });
        const cartIconElement = screen.getByText('1');
        expect(cartIconElement).toBeInTheDocument();
    });
});