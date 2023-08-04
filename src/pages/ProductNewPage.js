import { Helmet } from 'react-helmet-async';

import ProductForm from '../components/Product/ProductForm/ProductForm';

export const ProductNewPage = function () {
    return (
        <>
            <Helmet>
                <title>Add New Product</title>
            </Helmet>
            <ProductForm edit={false} />;
        </>
    );
};
