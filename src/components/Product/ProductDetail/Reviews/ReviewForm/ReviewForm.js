import { useState } from 'react';
import useInput from '../../../../../hooks/use-input';
import { Form, useSubmit } from 'react-router-dom';

import Button from '../../../../Button/Button';
import classes from './ReviewForm.module.css';

const ReviewForm = ({ onCancel }) => {
    const [rating, setRating] = useState(0);
    const {
        value,
        resetHandler,
        isValid,
        hasError,
        inputBlurHandler,
        inputChangeHandler,
    } = useInput({ validators: [{ name: 'isEmpty' }] });
    const submit = useSubmit();
    let formIsValid = false;
    if (isValid && rating > 0 && rating < 6) formIsValid = true;

    const reviewClasses = hasError
        ? `${classes['form-control']} ${classes['invalid']}`
        : `${classes['form-control']}`;

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('intent', 'add-review');
        submit(formData, { method: 'POST' });
        setRating(0);
        resetHandler();
    };

    return (
        <Form
            noValidate
            className={classes.form}
            method='POST'
            onSubmit={onSubmitHandler}>
            <div className={classes['form-control']}>
                <label htmlFor='rating' className={classes['form-label']}>
                    Rating
                </label>
                <input
                    id='rating'
                    type='number'
                    min={1}
                    max={5}
                    hidden={true}
                    value={rating}
                    onChange={() => {}}
                    name='rating'
                />
                <div className={classes['star-rating']} id='rating'>
                    {[...Array(5)].map((_, i) => (
                        <button
                            type='button'
                            key={i + 1}
                            className={`${classes['star-btn']}  ${
                                i + 1 <= rating ? classes['on'] : ''
                            }`}
                            onClick={() => setRating(i + 1)}
                        />
                    ))}
                </div>
            </div>
            <div className={reviewClasses}>
                <label htmlFor='review' className={classes['form-label']}>
                    Write a review
                </label>
                <textarea
                    name='body'
                    rows='3'
                    value={value}
                    id='review'
                    onChange={inputChangeHandler}
                    onBlur={inputBlurHandler}
                />
                {hasError && (
                    <p className={classes['error-text']}>
                        Please enter a valid review.
                    </p>
                )}
            </div>
            <div className={classes.actions}>
                <Button disabled={!formIsValid} type={'submit'}>
                    Submit
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </div>
        </Form>
    );
};

export default ReviewForm;
