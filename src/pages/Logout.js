import { json, redirect } from 'react-router-dom';

import store, { cartActions } from '../store';
import { authActions, addressActions } from '../store';

export const action = async ({ request }) => {
    const data = await request.formData();
    const returnTo = data.get('returnTo');

    const res = await fetch(
        `${process.env.REACT_APP_REST_API_URL}/auth/logout`,
        {
            credentials: 'include',
        }
    );
    if (!res.ok) throw json({ message: 'Could not log out!' }, { status: 500 });
    store.dispatch(authActions.logout());
    store.dispatch(addressActions.removeAddress());
    store.dispatch(cartActions.removeCart());
    if (returnTo) return redirect(returnTo);
    return redirect('/');
};
