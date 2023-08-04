import { useState } from 'react';
import { useFetcher } from 'react-router-dom';
import useInput from '../../../hooks/use-input';

import ErrorModal from '../../ErrorModal/ErrorModal';
import classes from './SellerAccountForm.module.css';

import Button from '../../Button/Button';

const SellerAccountForm = ({ onCancel }) => {
    const { hasError, isValid, inputBlurHandler, inputChangeHandler } =
        useInput({ validators: [{ name: 'isEmpty' }] });
    const [checked, setChecked] = useState(false);
    const { data, Form, state } = useFetcher();
    const [close, setClose] = useState(false);
    const inputClass = hasError
        ? `${classes['form-control']} ${classes['invalid']}`
        : `${classes['form-control']}`;

    let formIsValid = false;
    if (isValid && checked) formIsValid = true;

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
                noValidate
                onSubmit={() => setClose(false)}
                action='/seller-account?index'
                className={classes['seller-form']}
                method='POST'>
                <div className={inputClass}>
                    <label htmlFor='company'>Company/Buisness Name</label>
                    <input
                        type='text'
                        name='company'
                        id='company'
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler}
                    />
                    {hasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid company.
                        </p>
                    )}
                </div>
                <div className={classes['form-control']}>
                    <input
                        type='checkbox'
                        name='agreement'
                        value={checked}
                        id='agreement'
                        onChange={(e) => {
                            setChecked(e.target.checked);
                        }}
                    />
                    <label
                        className={classes['agreement-label']}
                        htmlFor='agreement'>
                        I have read and agree to comply with terms and
                        conditions.
                    </label>
                </div>
                <Button
                    disabled={!formIsValid || state === 'submitting'}
                    type={'submit'}>
                    {state === 'submitting' ? 'Submitting' : 'Submit'}
                </Button>
                <Button disabled={state === 'submitting'} onClick={onCancel}>
                    Cancel
                </Button>
            </Form>
        </>
    );
};

export default SellerAccountForm;
