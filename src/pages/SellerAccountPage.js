import { json, useLoaderData, redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import customFetch from '../utils/customFetch';
import BGWhite from '../components/Helper/BGWhite';
import SellerAccount from '../components/SellerAccount/SellerAccount';

export const SellerAccountPage = function () {
    const seller = useLoaderData();
    return (
        <>
            <Helmet>
                <title>
                    {seller.seller ? 'Your Seller Account' : 'Become a Seller'}
                </title>
            </Helmet>
            <BGWhite />
            <SellerAccount seller={seller} />
        </>
    );
};

export async function loader() {
    const config = { method: 'GET' };

    const response = await customFetch(
        'http://localhost:8080/auth/company',
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
        'http://localhost:8080/auth/company',
        config
    );

    if (response.status === 422) return response;
    if (!response.ok)
        throw json({ message: 'Something went wrong' }, { status: 500 });

    return redirect('/seller-account');
}
