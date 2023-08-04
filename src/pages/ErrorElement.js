import { Helmet } from 'react-helmet-async';

import Error from '../components/Error/Error';

const ErrorElement = function () {
    return (
        <>
            <Helmet>
                <title>Error</title>
            </Helmet>
            <Error />
        </>
    );
};

export default ErrorElement;
