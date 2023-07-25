import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/category/category.selector';

import { CategoryContainer, CategoryTitle } from './category.styles';
import ProductCard from '../../components/product-card/product-card.components';

const Category = () => {
    const categoriesMap = useSelector(selectCategoriesMap);

    const { category } = useParams();
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {
                    products && products.map((product) =>
                        <ProductCard key={product.id} product={product} />)
                }
            </CategoryContainer>
        </Fragment>
    );
}

export default Category;