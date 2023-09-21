import { screen, fireEvent } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/test.utils";
import ProductCard from "../product-card.components";

describe("Product Card tests", () => {
    const mockProduct = {
        id: 1,
        name: "Brown Brim",
        imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
        price: 25,
    };

    test("It should render a product card", () => {
        renderWithProviders(<ProductCard product={mockProduct} />);

        expect(screen.getByText(/Brown Brim/i)).toBeInTheDocument();
    });

    test("Should add the product item when product card button is clicked", async () => {
        const { store } = renderWithProviders(<ProductCard product={mockProduct} />, {
            preloadedState: {
                cart: {
                    cartItems: [],
                },
            },
        });

        const addToCartButton = screen.getByText(/Add to cart/i);
        await fireEvent.click(addToCartButton);

        expect(store.getState().cart.cartItems.length).toBe(1);
    });

});
