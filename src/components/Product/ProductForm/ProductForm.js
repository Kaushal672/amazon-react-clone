import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import useInput from '../../../hooks/use-input';

import { deleteImage } from '../../../utils/cloudinaryImageManager';
import DropBox from '../../DropBox/DropBox';
import Button from '../../Button/Button';
import ErrorModal from '../../ErrorModal/ErrorModal';
import classes from './ProductForm.module.css';

const ProductForm = ({ data = {}, edit }) => {
    const {
        images = [],
        title = '',
        price = '',
        description = '',
        discount = '',
        category = '',
    } = data;

    const pageTitle = `${edit ? 'Edit' : 'Add'} Product`;
    const method = edit ? 'PUT' : 'POST';
    const { Form, submit, state, data: actionData } = useFetcher();
    const [close, setClose] = useState(false);
    const [imagesUrl, setImagesUrl] = useState([]);
    const [showDropBox, setShowDropBox] = useState(false);
    const [checked, setChecked] = useState([]);
    const [removingImage, setRemovingImage] = useState(false);

    const isSubmitting = state === 'submitting';

    useEffect(() => {
        setImagesUrl(images);
    }, []);

    const {
        isValid: titleIsValid,
        hasError: titleHasError,
        inputBlurHandler: titleBlurHandler,
        inputChangeHandler: titleChangeHandler,
    } = useInput({
        validators: [{ name: 'isEmpty' }],
        value: title,
    });
    const {
        isValid: priceIsValid,
        hasError: priceHasError,
        inputBlurHandler: priceBlurHandler,
        inputChangeHandler: priceChangeHandler,
    } = useInput({
        validators: [
            { name: 'isInt', options: { min: 0, allow_leading_zeroes: false } },
        ],
        value: price,
    });
    const {
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        inputBlurHandler: descriptionBlurHandler,
        inputChangeHandler: descriptionChangeHandler,
    } = useInput({
        validators: [{ name: 'isEmpty' }],
        value: description,
    });
    const {
        isValid: discountIsValid,
        hasError: discountHasError,
        inputBlurHandler: discountBlurHandler,
        inputChangeHandler: discountChangeHandler,
    } = useInput({
        validators: [{ name: 'isInt', options: { min: 0, max: 100 } }],
        value: discount,
    });

    let formIsValid = false;
    if (
        titleIsValid &&
        priceIsValid &&
        descriptionIsValid &&
        discountIsValid &&
        !removingImage &&
        imagesUrl.length > 0 &&
        imagesUrl.length < 4
    ) {
        formIsValid = true;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!formIsValid) return;
        setClose(false);
        const formData = new FormData(e.target);
        formData.delete('image');
        formData.append('images', JSON.stringify(imagesUrl));
        submit(formData, { method });
    };

    const dropBoxToggle = () => {
        setShowDropBox((prevState) => !prevState);
    };

    const uploadedFilesHandler = (files) => {
        setImagesUrl(files);
    };

    const checkBoxChangeHandler = (e) => {
        if (e.target.checked) {
            setChecked((prevState) => [...prevState, e.target.dataset.index]);
        } else {
            setChecked((prevState) =>
                prevState.filter((el) => el !== e.target.dataset.index)
            );
        }
    };

    const onRemoveHandler = async () => {
        setRemovingImage(true);
        let img = checked.map((el) => imagesUrl[el]);
        await deleteImage(img);
        setImagesUrl((prevState) =>
            prevState.filter((img, i) => !checked.includes(i.toString()))
        );
        setChecked([]);
        setRemovingImage(false);
    };

    const invalidClass = `${classes['form-control']} ${classes['invalid']}`;
    const validClass = `${classes['form-control']}`;

    const titleClasses = titleHasError ? invalidClass : validClass;
    const priceClasses = priceHasError ? invalidClass : validClass;
    const descriptionClasses = descriptionHasError ? invalidClass : validClass;
    const discountClasses = discountHasError ? invalidClass : validClass;

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

            <Form
                noValidate
                onSubmit={submitHandler}
                method={method}
                encType='multipart/form-data'
                className={classes['form']}>
                <h2 className={classes['form-title']}>{pageTitle}</h2>
                <div className={titleClasses}>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        onChange={titleChangeHandler}
                        onBlur={titleBlurHandler}
                        defaultValue={title}
                    />
                    {titleHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid title.
                        </p>
                    )}
                </div>
                <div className={classes['form-control']}>
                    <Button onClick={dropBoxToggle}>Upload Images</Button>
                    {showDropBox && (
                        <DropBox
                            onConfirm={dropBoxToggle}
                            uploadedFiles={imagesUrl}
                            uploadedFilesHandler={uploadedFilesHandler}
                        />
                    )}
                    {imagesUrl.length !== 0 && (
                        <div className={classes['img-preview']}>
                            <p className={classes['img-preview__text']}>
                                Your Uploaded Images
                            </p>
                            {imagesUrl.map((el, i) => (
                                <div
                                    className={classes['thumbnail']}
                                    key={el.filename}>
                                    <input
                                        className={classes['img-checkbox']}
                                        type='checkbox'
                                        id={`cb${i}`}
                                        onChange={checkBoxChangeHandler}
                                        data-index={i}
                                    />
                                    <label htmlFor={`cb${i}`}>
                                        <img
                                            src={el.url}
                                            alt='thumbnail'
                                            className={classes['thumbnail-img']}
                                        />
                                    </label>
                                </div>
                            ))}
                            {checked.length > 0 && (
                                <Button
                                    onClick={onRemoveHandler}
                                    disabled={removingImage}>
                                    {removingImage ? 'Removing...' : 'Remove'}
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                <div className={priceClasses}>
                    <label htmlFor='price'>Price</label>
                    <input
                        type='number'
                        name='price'
                        id='price'
                        min={0}
                        onChange={priceChangeHandler}
                        onBlur={priceBlurHandler}
                        defaultValue={price}
                    />
                    {priceHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid price.
                        </p>
                    )}
                </div>
                <div className={descriptionClasses}>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        name='description'
                        id='description'
                        rows={5}
                        onChange={descriptionChangeHandler}
                        onBlur={descriptionBlurHandler}
                        defaultValue={description}></textarea>
                    {descriptionHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid description.
                        </p>
                    )}
                </div>
                <div className={classes['form-control']}>
                    <label htmlFor='category'>Category</label>
                    <select
                        id='category'
                        name='category'
                        defaultValue={category || 'Electronics'}>
                        <option value='Electronics'>Electronics</option>
                        <option value='Home Appliance'>Home Appliance</option>
                        <option value='Travelling'>Travelling</option>
                        <option value='Gaming'>Gaming</option>
                        <option value='Office Products'>Office Products</option>
                        <option value='Clothing & Accessories'>
                            Clothing & Accessories
                        </option>
                        <option value='Grocery & Gourmet Food'>
                            Grocery & Garmet Food
                        </option>
                        <option value='Furniture'>Furniture</option>
                        <option value='Home & Kitchen'>Home & Kitchen</option>
                    </select>
                </div>
                <div className={discountClasses}>
                    <label htmlFor='discount'>Discount</label>
                    <input
                        type='number'
                        name='discount'
                        id='discount'
                        min={0}
                        max={100}
                        onChange={discountChangeHandler}
                        onBlur={discountBlurHandler}
                        defaultValue={discount}
                    />
                    {discountHasError && (
                        <p className={classes['error-text']}>
                            Please enter a valid discount.
                        </p>
                    )}
                </div>
                <Button
                    disabled={!formIsValid || removingImage || isSubmitting}
                    type='submit'>
                    {isSubmitting ? 'Submitting' : 'Save Product'}
                </Button>
            </Form>
        </>
    );
};

export default ProductForm;
