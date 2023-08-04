import { useFetcher } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import useInput from '../../../hooks/use-input';

import ErrorModal from '../../ErrorModal/ErrorModal';
import Button from '../../Button/Button';
import classes from './PersonalInfoForm.module.css';

const PersonalInfoForm = function ({ user, onCancel }) {
    const DEFAULT_PROFILE_URL = user.avatar.url;
    const { Form, data, state } = useFetcher();
    const [close, setClose] = useState(false);
    const isSubmitting = state === 'submitting';
    const [profileImgUrl, setProfileImgUrl] = useState(DEFAULT_PROFILE_URL);

    const {
        isValid: nameIsValid,
        hasError: nameHasError,
        inputBlurHandler: nameBlurHandler,
        inputChangeHandler: nameChangeHandler,
    } = useInput({
        validators: [{ name: 'isEmpty' }],
        value: user.username,
    });

    const {
        isValid: phoneNumberIsValid,
        hasError: phoneNumberHasError,
        inputBlurHandler: phoneNumberBlurHandler,
        inputChangeHandler: phoneNumberChangeHandler,
    } = useInput({
        validators: [{ name: 'isMobilePhone', args: [['en-IN']] }],
        value: user.phone,
    });

    const {
        isValid: emailIsValid,
        hasError: emailHasError,
        inputBlurHandler: emailBlurHandler,
        inputChangeHandler: emailChangeHandler,
    } = useInput({
        validators: [{ name: 'isEmail' }],
        value: user.email,
    });

    let formIsValid = false;
    if (emailIsValid && nameIsValid && phoneNumberIsValid) formIsValid = true;

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

    return (
        <>
            {data && !close && state === 'idle' && (
                <ErrorModal
                    error={data.message}
                    data={data.data}
                    onConfirm={() => {
                        setClose(true);
                    }}
                />
            )}
            <Form
                onSubmit={() => {
                    setClose(false);
                }}
                method={'POST'}
                encType='multipart/form-data'
                className={classes['form']}>
                <h2 className={classes['form-title']}>
                    Edit your Personal Info
                </h2>
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
                            defaultValue={user.username}
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
                            defaultValue={user.phone}
                        />
                        {phoneNumberHasError && (
                            <p className={classes['error-text']}>
                                Please enter a valid phone number.
                            </p>
                        )}
                    </div>
                </>
                <div className={emailClasses}>
                    <label htmlFor='email'>Email</label>
                    <input
                        placeholder='johndoe@example.com'
                        type='email'
                        name='email'
                        id='email'
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        defaultValue={user.email}
                    />
                    {emailHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid email.
                        </p>
                    )}
                </div>
                <div className={classes['form-actions']}>
                    <Button
                        name='intent'
                        value='update-personal-info'
                        disabled={!formIsValid || isSubmitting}
                        type='submit'>
                        {isSubmitting ? 'Submitting' : 'Submit'}
                    </Button>
                    <Button disabled={isSubmitting} onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default PersonalInfoForm;
