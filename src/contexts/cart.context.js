import { createContext, useState } from 'react';

const addItem = (cartItems, productToAdd) => {
    console.log(cartItems, productToAdd);
    // check whether the item is already in the cart
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // if found increment the quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    // if a new item is added
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
});


export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (product) =>
        setCartItems(addItem(cartItems, product));

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};