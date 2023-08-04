import { json, redirect, useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import customFetch from '../utils/customFetch';
import Orders from '../components/Orders/Orders';
import BGWhite from '../components/Helper/BGWhite';

export const OrdersPage = function () {
    const data = useLoaderData();
    return (
        <>
            <Helmet>
                <title>Your Orders</title>
            </Helmet>
            <BGWhite />
            <Orders orders={data.orders} />
        </>
    );
};

export async function loader() {
    const response = await customFetch('http://localhost:8080/products/orders');

    if (!response.ok)
        throw json(
            { message: 'Something went wrong' },
            { status: response.status }
        );
    return response;
}

export async function action({ request }) {
    const data = Object.fromEntries(await request.formData());

    const config = {
        method: request.method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await customFetch(
        'http://localhost:8080/products/orders',
        config
    );

    if (!response.ok)
        throw json(
            { message: 'Something went wrong' },
            { status: response.status }
        );

    const resData = await response.json();

    return redirect(resData.url);
}
