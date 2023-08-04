import { json, redirect, useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import store, { addressActions } from '../store';
import customFetch from '../utils/customFetch';
import Address from '../components/Address/Address';
import BGWhite from '../components/Helper/BGWhite';

export const AddressPage = () => {
    const { address } = useLoaderData();

    return (
        <>
            <Helmet>
                <title>Your Addresses</title>
            </Helmet>
            <BGWhite />
            <Address address={address} />
        </>
    );
};

export async function loader() {
    const response = await customFetch('http://localhost:8080/auth/address');

    if (!response.ok)
        throw json(
            { message: 'Something went wrong' },
            { status: response.status }
        );
    return response;
}

export async function action({ request, params }) {
    const data = await request.formData();
    const method = request.method;
    const intent = data.get('intent');

    const config = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
    };

    const response = await customFetch(
        'http://localhost:8080/auth/address',
        config
    );

    if (response.status === 422) return response;
    if (!response.ok)
        throw json({ message: 'Something went wrong' }, { status: 500 });

    if (intent === 'add-address' || intent === 'default-address') {
        const resData = await response.json();
        store.dispatch(addressActions.setAddress(resData.address));
    }
    return redirect('/address');
}
