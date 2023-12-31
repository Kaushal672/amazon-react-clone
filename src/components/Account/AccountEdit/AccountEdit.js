import { useState } from 'react';
import { json, redirect, useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import customFetch from '../../../utils/customFetch';
import store, { authActions } from '../../../store';

import Button from '../../Button/Button';
import PasswordForm from '../PasswordForm/PasswordForm';
import PersonalInfoForm from '../PersonalInfoForm/PersonalInfoForm';
import classes from './AccountEdit.module.css';
import useBgColor from '../../../hooks/use-bg-color';
import { responseErrorHandler } from '../../../utils/responseErrorHandler';

export const AccountEdit = () => {
    const [showPIForm, setShowPIForm] = useState(false);
    const [showPWForm, setShowPWForm] = useState(false);
    const data = useLoaderData();
    useBgColor('white', '#e3e6e6');

    return (
        <>
            <Helmet>
                <title>Amazon Login & Security</title>
            </Helmet>
            {!showPIForm && !showPWForm && (
                <div className={classes['account-edit__wrapper']}>
                    <h1 className={classes['page-title']}>Login & Security</h1>
                    <div className={classes['account-edit__container']}>
                        <div className={classes['account-edit__row']}>
                            <h4 className={classes['account-edit__title']}>
                                Edit Your Personal Info
                            </h4>
                            <div className={classes['account-edit__actions']}>
                                <p>
                                    Edit your profile picture, name, email,
                                    phone number.
                                </p>
                                <Button
                                    onClick={() => {
                                        setShowPIForm(true);
                                    }}>
                                    Edit
                                </Button>
                            </div>
                        </div>
                        <div className={classes['account-edit__row']}>
                            <h4 className={classes['account-edit__title']}>
                                Change your password
                            </h4>
                            <div className={classes['account-edit__actions']}>
                                <p>
                                    Password compromised? Change your password
                                    now.
                                </p>
                                <Button
                                    onClick={() => {
                                        setShowPWForm(true);
                                    }}>
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showPWForm && (
                <PasswordForm
                    onCancel={() => {
                        setShowPWForm(false);
                    }}
                />
            )}
            {showPIForm && (
                <PersonalInfoForm
                    user={data.user}
                    onCancel={() => {
                        setShowPIForm(false);
                    }}
                />
            )}
        </>
    );
};

export async function action({ request }) {
    const data = await request.formData();

    const method = request.method;
    const intent = data.get('intent');

    if (intent === 'confirm-password' || intent === 'new-password') {
        const config = {
            method,
            body: JSON.stringify(Object.fromEntries(data)),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };

        const response = await customFetch(
            `${process.env.REACT_APP_REST_API_URL}/auth/change-password`,
            config
        );

        if (response.status === 422 || response.status === 403) return response;

        responseErrorHandler(response);

        if (intent === 'confirm-password') {
            return json({ status: 'success' });
        } else if (intent === 'new-password') {
            return redirect('/account');
        }
    } else if (intent === 'update-personal-info') {
        const config = {
            method: 'POST',
            body: data,
        };

        const response = await customFetch(
            `${process.env.REACT_APP_REST_API_URL}/auth/personal-info`,
            config
        );

        if (response.status === 422) return response;
        responseErrorHandler(response);

        store.dispatch(authActions.updateName(data.get('username')));
        return redirect('/account');
    }
}

export async function loader() {
    const response = await customFetch(
        `${process.env.REACT_APP_REST_API_URL}/auth/personal-info`
    );

    responseErrorHandler(response);

    return response;
}
