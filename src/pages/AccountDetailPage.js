import { Helmet } from 'react-helmet-async';

import Account from '../components/Account/Account';
import BGWhite from '../components/Helper/BGWhite';

export const AccountDetailPage = function () {
    return (
        <>
            <Helmet>
                <title>Your Account</title>
            </Helmet>
            <BGWhite />
            <Account />
        </>
    );
};
