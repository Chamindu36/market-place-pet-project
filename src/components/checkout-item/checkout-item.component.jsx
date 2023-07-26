import { useDispatch, useSelector } from 'react-redux';

import {
    clearItemFromCart,
    addItemToCart,
    removeItemFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, RemoveButton } from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {

    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);

    const { name, imageUrl, price, quantity } = cartItem;

    const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const addItem = () => dispatch(addItemToCart(cartItems, cartItem));
    const clearItem = () => dispatch(clearItemFromCart(cartItems, cartItem));

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