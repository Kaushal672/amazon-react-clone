import { json, redirect, useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import customFetch from '../utils/customFetch';
import Orders from '../components/Orders/Orders';
import useBgColor from '../hooks/use-bg-color';

export const OrdersPage = function () {
    const data = useLoaderData();
    useBgColor('white', '#e3e6e6');
    return (
        <>
            <Helmet>
                <title>Your Orders</title>
            </Helmet>
            <Orders orders={data.orders} />
        </>
    );
};

export async function loader() {
    const response = await customFetch(
        `${process.env.REACT_APP_REST_API_URL}/products/orders`
    );

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
        `${process.env.REACT_APP_REST_API_URL}/products/orders`,
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
