import { json, useLoaderData, redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import store, { cartActions } from '../store';
import customFetch from '../utils/customFetch';
import Cart from '../components/Cart/Cart';

export const CartPage = function () {
    const { cart } = useLoaderData();
    return (
        <>
            <Helmet>
                <title>Amazon Shopping Cart</title>
            </Helmet>
            <Cart cart={cart} />
        </>
    );
};

export async function loader() {
    const response = await customFetch(
        `${process.env.REACT_APP_REST_API_URL}/products/cart`
    );

    if (!response.ok)
        throw json(
            { message: 'Could not load cart.' },
            { status: response.status }
        );
    const data = await response.json();
    store.dispatch(cartActions.setCart(data.cart.items.length));
    return data;
}

export async function action({ request }) {
    const data = await request.formData();

    const method = request.method;

    const config = {
        method,
        body: JSON.stringify(Object.fromEntries(data)),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await customFetch(
        `${process.env.REACT_APP_REST_API_URL}/products/cart`,
        config
    );

    if (!response.ok) {
        const data = await response.json();
        throw json(
            {
                message: data.message,
            },
            { status: response.status }
        );
    }

    return redirect('/cart');
}
