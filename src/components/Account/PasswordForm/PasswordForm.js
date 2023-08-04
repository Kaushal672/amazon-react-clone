import { useState } from 'react';
import { useFetcher } from 'react-router-dom';
import useInput from '../../../hooks/use-input';

import ErrorModal from '../../ErroModal/ErrorModal';
import Button from '../../Button/Button';
import classes from './PasswordForm.module.css';

const PasswordForm = ({ onCancel }) => {
    const [close, setClose] = useState(false);

    const {
        isValid,
        hasError,
        inputBlurHandler,
        inputChangeHandler,
        resetHandler,
        value,
    } = useInput({
        validators: [
            {
                name: 'isStrongPassword',
                options: { minLowercase: 0, minUppercase: 0 },
            },
        ],
    });

    const { Form, data, state, submit } = useFetcher();
    const status = data?.status || 'pending';

    const pageTitle =
        status === 'pending' ? 'Confirm change password' : 'New Password';

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        formData.append(
            'intent',
            status === 'success' ? 'new-password' : 'confirm-password'
        );

        submit(formData, {
            method: status === 'pending' ? 'post' : 'patch',
            action: '/account/edit',
        });
        setClose(false);
        resetHandler();
    };

    return (
        <>
            {data && data.message && !close && state === 'idle' && (
                <ErrorModal
                    error={data.message}
                    data={data.data}
                    onConfirm={() => {
                        setClose(true);
                    }}
                />
            )}
            <Form onSubmit={submitHandler} className={classes.form} noValidate>
                <h2 className={classes['form-title']}>{pageTitle}</h2>
                <div
                    className={
                        hasError
                            ? `${classes['form-control']} ${classes['invalid']}`
                            : classes['form-control']
                    }>
                    <label htmlFor='password'>
                        Enter your {status === 'pending' ? 'current' : 'new'}{' '}
                        password
                    </label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler}
                        value={value}
                    />
                    {hasError && (
                        <p className={classes['error-text']}>
                            Enter a valid password with atleast one digit , one
                            symbol and with minimum length of 8.
                        </p>
                    )}
                    {status === 'success' && (
                        <p className={classes['info']}>
                            Change your pasword within 10 minutes
                        </p>
                    )}
                </div>
                <div className={classes['form-action']}>
                    <Button
                        disabled={!isValid || state === 'submitting'}
                        type='submit'>
                        {state === 'submitting' ? 'Submitting' : 'Submit'}
                    </Button>
                    <Button
                        disabled={state === 'submitting'}
                        onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default PasswordForm;
