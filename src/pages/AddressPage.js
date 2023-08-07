import { redirect, useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import store, { addressActions } from '../store';
import customFetch from '../utils/customFetch';
import Address from '../components/Address/Address';
import useBgColor from '../hooks/use-bg-color';
import { responseErrorHandler } from '../utils/responseErrorHandler';

export const AddressPage = () => {
    const { address } = useLoaderData();
    useBgColor('white', '#e3e6e6');

    return (
        <>
            <Helmet>
                <title>Your Addresses</title>
            </Helmet>

            <Address address={address} />
        </>
    );
};

export async function loader() {
    const response = await customFetch(
        `${process.env.REACT_APP_REST_API_URL}/auth/address`
    );

    responseErrorHandler(response);
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
        `${process.env.REACT_APP_REST_API_URL}/auth/address`,
        config
    );

    if (response.status === 422) return response;
    responseErrorHandler(response);

    if (intent === 'add-address' || intent === 'default-address') {
        const resData = await response.json();
        store.dispatch(addressActions.setAddress(resData.address));
    }
    return redirect('/address');
}
