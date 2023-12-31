import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/category/category.selector';

import { CategoryContainer, CategoryTitle } from './category.styles';
import ProductCard from '../../components/product-card/product-card.components';
import Spinner from '../../components/spinner/spinner.component';

// Add the following to make sure this is always present as this is in a route
type CategoryRouteParams = {
    category: string;
};

const Category = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams; // restricting the keys of the Params object since we only can pass keys here.

    const [products, setProducts] = useState(categoriesMap[category]);


    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {isLoading ? <Spinner /> :
                <CategoryContainer>
                    {
                        products && products.map((product) =>
                            <ProductCard key={product.id} product={product} />)
                    }
                </CategoryContainer>}

        </Fragment>
    );
}

export default Category;