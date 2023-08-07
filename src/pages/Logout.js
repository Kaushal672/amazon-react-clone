import { redirect } from 'react-router-dom';

import store, { cartActions } from '../store';
import { authActions, addressActions } from '../store';
import { responseErrorHandler } from '../utils/responseErrorHandler';

export const action = async ({ request }) => {
    const data = await request.formData();
    const returnTo = data.get('returnTo');

    const res = await fetch(
        `${process.env.REACT_APP_REST_API_URL}/auth/logout`,
        {
            credentials: 'include',
        }
    );
    responseErrorHandler(res);
    store.dispatch(authActions.logout());
    store.dispatch(addressActions.removeAddress());
    store.dispatch(cartActions.removeCart());
    if (returnTo) return redirect(returnTo);
    return redirect('/');
};
