import { redirect } from 'react-router-dom';

import store from '../store';
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
    store.dispatch({ type: 'USER_LOGOUT' });
    if (returnTo) return redirect(returnTo);
    return redirect('/');
};
