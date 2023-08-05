import { Helmet } from 'react-helmet-async';

import Account from '../components/Account/Account';
import useBgColor from '../hooks/use-bg-color';

export const AccountDetailPage = function () {
    useBgColor('white', '#e3e6e6');
    return (
        <>
            <Helmet>
                <title>Your Account</title>
            </Helmet>
            <Account />
        </>
    );
};
