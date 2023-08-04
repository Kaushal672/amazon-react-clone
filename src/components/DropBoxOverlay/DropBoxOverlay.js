import { useState, useReducer, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { fileUpload } from '../../utils/cloudinaryImageManager';

import Button from '../Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import classes from './DropBoxOverlay.module.css';

const imagePickerReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return {
            ...state,
            files: action.value,
            showError: false,
        };
    }

    if (action.type === 'ERROR') {
        return {
            ...state,
            files: [],
            showError: true,
        };
    }
    if (action.type === 'UPLOADING') {
        return {
            ...state,
            uploading: true,
        };
    }

    if (action.type === 'UPLOADED') {
        return {
            ...state,
            files: [],
            uploadedFiles: [...state.uploadedFiles, ...action.uploadedFiles],
            uploading: false,
        };
    }

    return state;
};

const DropBoxOverlay = ({
    onConfirm,
    uploadedFiles = [],
    uploadedFilesHandler,
}) => {
    const initialImagePickerState = {
        files: [],
        uploadedFiles: uploadedFiles,
        uploading: false,
        showError: false,
    };

    const [imagePickerState, dispatch] = useReducer(
        imagePickerReducer,
        initialImagePickerState
    );

    const [previewUrls, setPreviewUrls] = useState([]);
    const [progress, setProgress] = useState([]);
    const inputFileRef = useRef(null);

    useEffect(() => {
        uploadedFilesHandler(imagePickerState.uploadedFiles);
    }, [imagePickerState.uploadedFiles, uploadedFilesHandler]);

    const fileChangeHandler = (e) => {
        if (e.target.files.length + imagePickerState.uploadedFiles.length > 3) {
            inputFileRef.current.value = '';
            dispatch({ type: 'ERROR' });
            setPreviewUrls([]);
        } else {
            dispatch({
                type: 'INPUT',
                value: [...e.target.files],
            });

            const previewImagesArr = [];
            if (e.target.files.length > 0) {
                [...e.target.files].forEach((file) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    reader.onload = (evt) => {
                        previewImagesArr.push(evt.target.result);
                        if (previewImagesArr.length === e.target.files.length) {
                            setPreviewUrls(previewImagesArr);
                        }
                    };
                });
            } else {
                setPreviewUrls([]);
            }
        }
    };

    const fileUploadHandler = async () => {
        dispatch({ type: 'UPLOADING' });
        let imageUrl = await fileUpload(imagePickerState.files, (p) => {
            setProgress([...p]);
        });
        dispatch({
            type: 'UPLOADED',
            uploadedFiles: imageUrl,
        });
        inputFileRef.current.value = '';
        setProgress([]);
        setPreviewUrls([]);
    };

    return (
        <div className={classes['overlay']}>
            <span className={classes.close} onClick={onConfirm}>
                <FontAwesomeIcon icon={faXmark} size='lg' />
            </span>
            <span className={classes.dragbox}>
                <span className={classes['drop-icon']}>
                    <FontAwesomeIcon icon={faFile} size='6x' />
                </span>
                <p className={classes['drop-text']}>
                    Drop Your files here or click to browse
                </p>
                <input
                    disabled={imagePickerState.uploading}
                    type='file'
                    accept='image/jpeg, image/jpg, image/png, image/avif'
                    className={classes['file-input']}
                    name='image'
                    id='image'
                    multiple
                    onChange={fileChangeHandler}
                    ref={inputFileRef}
                />
            </span>
            {previewUrls.length > 0 && (
                <div>
                    {previewUrls.map((el, i) => (
                        <div className={classes['thumbnail']} key={i}>
                            <img src={el} alt='thumbnail' />
                        </div>
                    ))}
                </div>
            )}
            {imagePickerState.showError && (
                <div>
                    <p className={classes['image-validation']}>
                        Please Upload maximum of 3 images and minimum of 1.
                    </p>
                </div>
            )}
            {imagePickerState.uploadedFiles.length > 0 && (
                <span>
                    You have uploaded {imagePickerState.uploadedFiles.length}{' '}
                    files.
                </span>
            )}
            {progress.length > 0 &&
                progress.map((el, i) => (
                    <ProgressBar key={i} file={el} id={i} />
                ))}
            <Button
                onClick={fileUploadHandler}
                disabled={
                    imagePickerState.uploading ||
                    imagePickerState.files.length < 1
                }>
                {imagePickerState.uploading
                    ? "Uploading Files, Please Don't Close!!"
                    : 'Upload'}
            </Button>
        </div>
    );
};

export default DropBoxOverlay;
