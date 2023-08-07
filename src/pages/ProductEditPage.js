import { useRouteLoaderData, redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import customFetch from '../utils/customFetch';
import ProductForm from '../components/Product/ProductForm/ProductForm';
import { responseErrorHandler } from '../utils/responseErrorHandler';

export const ProductEditPage = function () {
    const { product } = useRouteLoaderData('product-detail');

    return (
        <>
            <Helmet>
                <title>Edit Product</title>
            </Helmet>
            <ProductForm data={product} edit={true} />
        </>
    );
};

export async function action({ request, params }) {
    const data = Object.fromEntries(await request.formData());
    const method = request.method;
    const url =
        `${process.env.REACT_APP_REST_API_URL}/products/` +
        (method === 'PUT' ? params.id : '');

    const config = {
        method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    };

    const response = await customFetch(url, config);

    if (response.status === 422) return response;

    responseErrorHandler(response);
    const resData = await response.json();
    return redirect(`/products/${resData.product._id}`);
}
