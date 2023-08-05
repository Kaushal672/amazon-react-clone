import { useState } from 'react';
import { useFetcher, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useInput from '../../../hooks/use-input';

import Button from '../../Button/Button';
import ErrorModal from '../../ErrorModal/ErrorModal';
import classes from './AddressForm.module.css';

const AddressForm = function ({ edit }) {
    const location = useLocation();
    const { Form, state, data: resData, submit } = useFetcher();
    let data;

    if (location.state) {
        data = location.state.address;
    }

    const pageTitle = `${edit ? 'Edit' : 'Add New'} Address`;
    const method = edit ? 'PUT' : 'POST';

    const [close, setClose] = useState(false);

    const navigate = useNavigate();
    const isSubmitting = state === 'submitting';

    const {
        isValid: countryIsValid,
        hasError: countryHasError,
        inputBlurHandler: countryBlurHandler,
        inputChangeHandler: countryChangeHandler,
    } = useInput({
        validators: [{ name: 'isLength', options: { min: 1, max: 30 } }],
        value: edit ? data?.country : '',
    });

    const {
        isValid: fullNameIsValid,
        hasError: fullNameHasError,
        inputBlurHandler: fullNameBlurHandler,
        inputChangeHandler: fullNameChangeHandler,
    } = useInput({
        validators: [{ name: 'isLength', options: { min: 1, max: 30 } }],
        value: edit ? data?.fullName : '',
    });

    const {
        isValid: phoneNumberIsValid,
        hasError: phoneNumberHasError,
        inputBlurHandler: phoneNumberBlurHandler,
        inputChangeHandler: phoneNumberChangeHandler,
    } = useInput({
        validators: [{ name: 'isMobilePhone', args: [['en-IN']] }],
        value: edit ? data?.phone : '',
    });

    const {
        isValid: pincodeIsValid,
        hasError: pincodeHasError,
        inputBlurHandler: pincodeBlurHandler,
        inputChangeHandler: pincodeChangeHandler,
    } = useInput({
        validators: [{ name: 'isPostalCode', args: ['IN'] }],
        value: edit ? data?.pincode : '',
    });

    const {
        isValid: addressLineIsValid,
        hasError: addressLineHasError,
        inputBlurHandler: addressLineBlurHandler,
        inputChangeHandler: addressLineChangeHandler,
    } = useInput({
        validators: [{ name: 'isLength', options: { min: 1, max: 50 } }],
        value: edit ? data?.addressline : '',
    });

    const {
        isValid: cityIsValid,
        hasError: cityHasError,
        inputBlurHandler: cityBlurHandler,
        inputChangeHandler: cityChangeHandler,
    } = useInput({
        validators: [{ name: 'isLength', options: { min: 1, max: 30 } }],
        value: edit ? data?.city : '',
    });

    const {
        isValid: stateIsValid,
        hasError: stateHasError,
        inputBlurHandler: stateBlurHandler,
        inputChangeHandler: stateChangeHandler,
    } = useInput({
        validators: [{ name: 'isLength', options: { min: 1, max: 30 } }],
        value: edit ? data?.state : '',
    });

    let formIsValid = false;
    if (
        countryIsValid &&
        fullNameIsValid &&
        phoneNumberIsValid &&
        pincodeIsValid &&
        addressLineIsValid &&
        cityIsValid &&
        stateIsValid
    ) {
        formIsValid = true;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!formIsValid) return;
        setClose(false);
        const formData = new FormData(e.target);
        if (!edit) formData.append('intent', 'add-address');
        if (edit) formData.append('id', data._id);
        submit(formData, { method, action: '/address?index' });
    };

    const onCancelHandler = () => {
        navigate(-1);
    };

    const invalidClass = `${classes['form-control']} ${classes['invalid']}`;
    const validClass = `${classes['form-control']}`;

    const countryClasses = countryHasError ? invalidClass : validClass;
    const fullNameClasses = fullNameHasError ? invalidClass : validClass;
    const phoneNumberClasses = phoneNumberHasError ? invalidClass : validClass;
    const pincodeClasses = pincodeHasError ? invalidClass : validClass;
    const addressLine1Classes = addressLineHasError ? invalidClass : validClass;
    const cityClasses = cityHasError ? invalidClass : validClass;
    const stateClasses = stateHasError ? invalidClass : validClass;

    return (
        <>
            {resData && !close && state === 'idle' && (
                <ErrorModal
                    error={resData.message}
                    data={resData.data}
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
                onSubmit={submitHandler}
                method={method}
                className={classes['form']}>
                <h2 className={classes['form-title']}>{pageTitle}</h2>
                <div className={countryClasses}>
                    <label htmlFor='country'>Country/Region</label>
                    <input
                        type='text'
                        name='country'
                        id='country'
                        defaultValue={data ? data.country : ''}
                        onChange={countryChangeHandler}
                        onBlur={countryBlurHandler}
                    />
                    {countryHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid country.
                        </p>
                    )}
                </div>
                <div className={fullNameClasses}>
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                        type='text'
                        name='fullName'
                        id='fullName'
                        defaultValue={data ? data.fullName : ''}
                        onChange={fullNameChangeHandler}
                        onBlur={fullNameBlurHandler}
                    />
                    {fullNameHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid full name.
                        </p>
                    )}
                </div>
                <div className={phoneNumberClasses}>
                    <label htmlFor='phone'>Phone Number</label>
                    <input
                        type='text'
                        name='phone'
                        id='phone'
                        defaultValue={data ? data.phone : ''}
                        onChange={phoneNumberChangeHandler}
                        onBlur={phoneNumberBlurHandler}
                    />
                    {phoneNumberHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid phone number.
                        </p>
                    )}
                </div>
                <div className={pincodeClasses}>
                    <label htmlFor='pincode'>Pincode</label>
                    <input
                        type='text'
                        name='pincode'
                        id='pincode'
                        defaultValue={data ? data.pincode : ''}
                        onChange={pincodeChangeHandler}
                        onBlur={pincodeBlurHandler}
                    />
                    {pincodeHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid pincode.
                        </p>
                    )}
                </div>
                <div className={addressLine1Classes}>
                    <label htmlFor='address-line'>
                        Flat, House no., Building, Company, Apartment
                    </label>
                    <input
                        type='text'
                        name='addressline'
                        id='address-line'
                        defaultValue={data ? data.addressline : ''}
                        onChange={addressLineChangeHandler}
                        onBlur={addressLineBlurHandler}
                    />
                    {addressLineHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid address.
                        </p>
                    )}
                </div>
                <div className={cityClasses}>
                    <label htmlFor='city'>Town/City</label>
                    <input
                        type='text'
                        name='city'
                        id='city'
                        defaultValue={data ? data.city : ''}
                        onChange={cityChangeHandler}
                        onBlur={cityBlurHandler}
                    />
                    {cityHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid address.
                        </p>
                    )}
                </div>
                <div className={stateClasses}>
                    <label htmlFor='state'>State</label>
                    <input
                        type='text'
                        name='state'
                        id='state'
                        defaultValue={data ? data.state : ''}
                        onChange={stateChangeHandler}
                        onBlur={stateBlurHandler}
                    />
                    {stateHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid address.
                        </p>
                    )}
                </div>
                {!edit && (
                    <div
                        className={`${classes['form-control']} ${classes['form-control__checkbox']} `}>
                        <input
                            type='checkbox'
                            name='defaultAddress'
                            id='default-address'
                            defaultChecked={data ? data.default : false}
                        />
                        <label htmlFor='default-address'>
                            Make this my default address
                        </label>
                    </div>
                )}
                <div className={classes['form-actions']}>
                    <Button
                        disabled={!formIsValid || isSubmitting}
                        type='submit'>
                        {isSubmitting ? 'Submitting' : 'Save Address'}
                    </Button>
                    <Button disabled={isSubmitting} onClick={onCancelHandler}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default AddressForm;
