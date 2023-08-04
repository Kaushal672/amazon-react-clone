import store, { cartActions } from '../store/index';
import dayjs from 'dayjs';

import { authActions, addressActions } from '../store/index';

const originalRequest = async (url, config) => {
    const response = await fetch(url, config);

    return response;
};

const refreshToken = async () => {
    const res = await fetch('http://localhost:8080/auth/refresh', {
        method: 'POST',
        credentials: 'include',
    });

    if (res.status === 401) {
        await originalRequest('http://localhost:8080/auth/logout', {
            credentials: 'include',
        });
        store.dispatch(authActions.logout());
        store.dispatch(addressActions.removeAddress());
        store.dispatch(cartActions.removeCart());
        throw res;
    }

    const data = await res.json();
    store.dispatch(authActions.updateToken(data.accessToken));
    return data.accessToken;
};

const customFetch = async (url, config = {}) => {
    let {
        auth: { access_token, expiration },
    } = store.getState();

    const isExpired = dayjs.unix(expiration).diff(dayjs()) < 1;

    if (isExpired) {
        try {
            access_token = await refreshToken();
        } catch (e) {
            return e;
        }
    }

    if (config['headers']) {
        config['headers']['Authorization'] = `Bearer ${access_token}`;
    } else {
        config['headers'] = { Authorization: `Bearer ${access_token}` };
    }

    const response = await originalRequest(url, config);

    return response;
};

export default customFetch;
