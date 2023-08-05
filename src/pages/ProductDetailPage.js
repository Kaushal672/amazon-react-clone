import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import customFetch from '../utils/customFetch';
import ProductDetail from '../components/Product/ProductDetail/ProductDetail';
import useBgColor from '../hooks/use-bg-color';

export const ProductDetailPage = function () {
    const { product } = useRouteLoaderData('product-detail');
    useBgColor('white', '#e3e6e6');

    return (
        <>
            <Helmet>
                <title>{product.title}</title>
            </Helmet>
            <ProductDetail product={product} />
        </>
    );
};

export async function loader({ params }) {
    const { id } = params;
    const res = await fetch(`http://localhost:8080/products/${id}`);

    if (!res.ok)
        throw json(
            { message: 'Could not fetch product.' },
            { status: res.status }
        );
    return res;
}

export async function action({ request, params }) {
    const data = await request.formData();
    const intent = data.get('intent');
    const id = params.id;

    if (intent === 'delete-product') {
        const config = { method: 'DELETE' };

        const response = await customFetch(
            `http://localhost:8080/products/${id}`,
            config
        );

        if (!response.ok)
            throw json(
                { message: 'Could not delete product.' },
                { status: response.status }
            );

        return redirect('/seller-account');
    } else if (intent === 'add-review') {
        const config = {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(data)),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await customFetch(
            `http://localhost:8080/products/${id}/reviews`,
            config
        );

        if (!response.ok) {
            throw json(
                { message: 'Could not add review.' },
                { status: response.status }
            );
        }

        return redirect('/products/' + id);
    } else if (intent === 'delete-review') {
        const config = { method: 'DELETE' };

        const response = await customFetch(
            `http://localhost:8080/products/${id}/reviews/${data.get(
                'reviewId'
            )}`,
            config
        );

        if (!response.ok)
            throw json(
                { message: 'Could not delete review' },
                { status: response.status }
            );
        return redirect('/products/' + id);
    }
}
