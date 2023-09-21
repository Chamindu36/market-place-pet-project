import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { ProductCartContainer, Footer, Name, Price } from './product-card.styles';

import { CategoryItem } from '../../store/category/category.types';

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    const { name, price, imageUrl } = product;


    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.base}
                onClick={addProductToCart}
            >
                Add to cart
            </Button>
        </ProductCartContainer>
    );
};

export default ProductCard;