import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemToCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (bool) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);


