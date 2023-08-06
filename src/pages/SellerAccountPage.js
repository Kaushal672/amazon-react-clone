import { json, useLoaderData, redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import customFetch from '../utils/customFetch';

import SellerAccount from '../components/SellerAccount/SellerAccount';
import useBgColor from '../hooks/use-bg-color';

export const SellerAccountPage = function () {
    const seller = useLoaderData();
    useBgColor('white', '#e3e6e6');
    return (
        <>
            <Helmet>
                <title>
                    {seller.seller ? 'Your Seller Account' : 'Become a Seller'}
                </title>
            </Helmet>
            <SellerAccount seller={seller} />
        </>
    );
};

export async function loader() {
    const config = { method: 'GET' };

    const response = await customFetch(
        `${process.env.REACT_APP_REST_API_URL}/auth/company`,
        config
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
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await customFetch(
        `${process.env.REACT_APP_REST_API_URL}/auth/company`,
        config
    );

    if (response.status === 422) return response;
    if (!response.ok)
        throw json({ message: 'Something went wrong' }, { status: 500 });

    return redirect('/seller-account');
}
