import { useState, useEffect } from 'react';
import {
    useFetcher,
    useNavigate,
    Link,
    useSearchParams,
    useLocation,
} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button/Button';
import useInput from '../../hooks/use-input';
import ErrorModal from '../ErroModal/ErrorModal';
import classes from './Auth.module.css';

const DEFAULT_PROFILE_URL =
    'https://res.cloudinary.com/dlds2z087/image/upload/v1669354509/India%20Tour/default_avatar_fbyzfp.jpg';

const Auth = function () {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const [profileImgUrl, setProfileImgUrl] = useState(DEFAULT_PROFILE_URL);
    const { Form, data: actionData, state } = useFetcher();

    const pageTitle = isLogin ? 'Sign in' : 'Sign up';

    const [close, setClose] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const flash = location.state?.flash;

    const isSubmitting = state === 'submitting';

    useEffect(() => {
        if (flash) {
            window.flash(flash);
        }
    }, [flash]);

    const {
        isValid: nameIsValid,
        hasError: nameHasError,
        inputBlurHandler: nameBlurHandler,
        inputChangeHandler: nameChangeHandler,
    } = useInput({ validators: [{ name: 'isEmpty' }] });

    const {
        isValid: phoneNumberIsValid,
        hasError: phoneNumberHasError,
        inputBlurHandler: phoneNumberBlurHandler,
        inputChangeHandler: phoneNumberChangeHandler,
    } = useInput({
        validators: [{ name: 'isMobilePhone', args: ['en-IN'] }],
    });

    const {
        isValid: emailIsValid,
        hasError: emailHasError,
        inputBlurHandler: emailBlurHandler,
        inputChangeHandler: emailChangeHandler,
    } = useInput({ validators: [{ name: 'isEmail' }] });

    const {
        isValid: passwordIsValid,
        hasError: passwordHasError,
        inputBlurHandler: passwordBlurHandler,
        inputChangeHandler: passwordChangeHandler,
    } = useInput({
        validators: [
            {
                name: 'isStrongPassword',
                options: { minLowercase: 0, minUppercase: 0 },
            },
        ],
    });

    let formIsValid = false;
    if (emailIsValid && passwordIsValid) {
        if (!isLogin && nameIsValid && phoneNumberIsValid) formIsValid = true;
        else if (isLogin) formIsValid = true;
    }

    const onCancel = () => {
        navigate('../', { replace: true });
    };

    const onImageInputChangeHandler = function (e) {
        if (e.target.files.length) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function () {
                setProfileImgUrl(this.result);
            };
            reader.readAsDataURL(file);
        } else {
            setProfileImgUrl(DEFAULT_PROFILE_URL);
        }
    };

    const invalidClass = `${classes['form-control']} ${classes['invalid']}`;
    const validClass = `${classes['form-control']}`;

    const nameClasses = nameHasError ? invalidClass : validClass;
    const phoneNumberClasses = phoneNumberHasError ? invalidClass : validClass;
    const emailClasses = emailHasError ? invalidClass : validClass;
    const passwordClasses = passwordHasError ? invalidClass : validClass;

    return (
        <>
            {actionData && !close && state === 'idle' && (
                <ErrorModal
                    error={actionData.message}
                    data={actionData.data}
                    onConfirm={() => {
                        setClose(true);
                    }}
                />
            )}
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <Form
                noValidate
                onSubmit={() => {
                    setClose(false);
                }}
                method={'POST'}
                encType='multipart/form-data'
                className={classes['form']}>
                <h2 className={classes['form-title']}>{pageTitle}</h2>
                {!isLogin && (
                    <>
                        <div className={classes['profile__form-control']}>
                            <label
                                htmlFor='avatar-input'
                                className={classes['profile-container']}>
                                <FontAwesomeIcon icon={faCamera} size='2x' />
                                <img
                                    id='avatar-image'
                                    alt='avatar'
                                    className={classes['profile-image']}
                                    src={profileImgUrl}
                                />
                            </label>
                            <input
                                onChange={onImageInputChangeHandler}
                                id='avatar-input'
                                className={classes['image-upload']}
                                type='file'
                                name='avatar'
                                accept='image/jpeg, image/jpg, image/png'
                                capture
                            />
                        </div>
                        <div className={nameClasses}>
                            <label htmlFor='username'>Your Name</label>
                            <input
                                placeholder='First and last name'
                                type='text'
                                name='username'
                                id='username'
                                onChange={nameChangeHandler}
                                onBlur={nameBlurHandler}
                            />
                            {nameHasError && (
                                <p className={classes['error-text']}>
                                    Please enter a valid full name.
                                </p>
                            )}
                        </div>
                        <div className={phoneNumberClasses}>
                            <label htmlFor='phone'>Phone Number</label>
                            <input
                                placeholder='1234567890'
                                type='text'
                                name='phone'
                                id='phone'
                                onChange={phoneNumberChangeHandler}
                                onBlur={phoneNumberBlurHandler}
                            />
                            {phoneNumberHasError && (
                                <p className={classes['error-text']}>
                                    Please enter a valid phone number.
                                </p>
                            )}
                        </div>
                    </>
                )}
                <div className={emailClasses}>
                    <label htmlFor='email'>Email</label>
                    <input
                        placeholder='johndoe@example.com'
                        type='email'
                        name='email'
                        id='email'
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                    />
                    {emailHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid email.
                        </p>
                    )}
                </div>
                <div className={passwordClasses}>
                    <label htmlFor='password'>Password</label>
                    <input
                        placeholder='At least 8 characters'
                        type='password'
                        name='password'
                        id='password'
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                    />
                    {passwordHasError && (
                        <p className={classes['error-text']}>
                            Enter a valid password with atleast one digit , one
                            symbol and with minimum length of 8.
                        </p>
                    )}
                </div>
                <div className={classes['form-actions']}>
                    <Button
                        disabled={!formIsValid || isSubmitting}
                        type='submit'>
                        {isSubmitting
                            ? 'Submitting'
                            : isLogin
                            ? 'Sign in'
                            : 'Sign up'}
                    </Button>
                    <Button disabled={isSubmitting} onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
                <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                    {isLogin
                        ? 'New to Amazon? Sign up'
                        : 'Already have an Account? Sign in'}
                </Link>
            </Form>
        </>
    );
};

export default Auth;
