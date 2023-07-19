import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, RemoveButton } from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
    const { name, imageUrl, price, quantity } = cartItem;

    const removeItem = () => removeItemFromCart(cartItem);
    const addItem = () => addItemToCart(cartItem);
    const clearItem = () => clearItemFromCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan> {name} </BaseSpan>
            <Quantity>
                <div className='arrow' onClick={removeItem}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItem}>
                    &#10095;
                </div>
            </Quantity>
            <BaseSpan> {price}</BaseSpan>
            <RemoveButton onClick={clearItem}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    )
};

export default CheckoutItem;