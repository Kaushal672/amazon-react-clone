import { useEffect } from 'react';
import { useRouteError, useLocation, useNavigate } from 'react-router-dom';

import MainNavBar from '../Layout/MainNavBar/MainNavBar';
import Footer from '../Layout/Footer/Footer';
import classes from './Error.module.css';
import useBgColor from '../../hooks/use-bg-color';

const Error = () => {
    const error = useRouteError();
    let message = 'Something went wrong!!';
    const { pathname } = useLocation();
    const navigate = useNavigate();
    useBgColor('white', '#e3e6e6');

    useEffect(() => {
        if (error.status === 403 && pathname === '/orders') {
            navigate('/address', {
                state: { flash: 'No address to deliver your order!!' },
            });
        }

        if (error.status === 401) {
            navigate(`/auth?mode=login&returnTo=${pathname}`, {
                state: { flash: 'You are not signed in!!' },
            });
        }
    }, [error.status, pathname, navigate]);

    let jsx = (
        <img
            src={require('../../images/Error.gif')}
            alt='error'
            className={classes['error-404-gif']}
        />
    );

    if (error.status === 500) {
        message = error.data?.message;
        jsx = (
            <img
                src={require('../../images/500.webp')}
                alt='500 error'
                className={classes['error-404-gif']}
            />
        );
    }

    if (error.status === 404) {
        message = 'Page your looking for is Not Found!!';
        jsx = (
            <img
                src={require('../../images/404.gif')}
                alt='404 error'
                className={classes['error-404-gif']}
            />
        );
    }

    return (
        <>
            <MainNavBar />
            <div className={classes['error-wrapper']}>
                {jsx}
                <h1 className={classes['error-title']}>{message}</h1>
            </div>
            <Footer />
        </>
    );
};

export default Error;
