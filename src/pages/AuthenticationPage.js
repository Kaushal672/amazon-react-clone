import { json, redirect } from 'react-router-dom';

import store, { addressActions, cartActions } from '../store';
import { authActions } from '../store';
import Auth from '../components/Auth/Auth';

export const AuthenticationPage = () => {
    return <Auth />;
};

export async function action({ request }) {
    const searchParms = new URL(request.url).searchParams;
    const mode = searchParms.get('mode') || 'login';
    const returnTo = searchParms.get('returnTo');

    if (mode !== 'login' && mode !== 'signup') {
        throw json({ message: 'Unsupported mode' }, { status: 422 });
    }

    const data = await request.formData();

    const body =
        mode === 'signup' ? data : JSON.stringify(Object.fromEntries(data));
    const headers =
        mode === 'signup' ? {} : { 'Content-Type': 'application/json' };

    const res = await fetch(
        `${process.env.REACT_APP_REST_API_URL}/auth/${mode}`,
        {
            method: 'POST',
            body,
            headers,
            credentials: 'include',
        }
    );

    if (res.status === 422 || res.status === 401) return res;

    if (!res.ok)
        throw json({ message: 'Could not authenticate user' }, { status: 500 });
    const resData = await res.json();

    store.dispatch(
        authActions.login({
            access_token: resData.accessToken,
        })
    );

    store.dispatch(addressActions.setAddress(resData.address));
    store.dispatch(cartActions.setCart(resData.cart));

    if (returnTo) return redirect(returnTo);
    return redirect('/');
}
