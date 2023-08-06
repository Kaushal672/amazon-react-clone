import { useRouteLoaderData, redirect, json } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import customFetch from '../utils/customFetch';
import ProductForm from '../components/Product/ProductForm/ProductForm';

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
        `http://localhost:8080/products/` + (method === 'PUT' ? params.id : '');

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

    if (!response.ok)
        throw json({ message: 'Could not save products' }, { status: 500 });
    const resData = await response.json();
    return redirect(`/products/${resData.product._id}`);
}
