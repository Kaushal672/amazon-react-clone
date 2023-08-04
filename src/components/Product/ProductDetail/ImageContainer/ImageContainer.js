import { useEffect, useRef, useState } from 'react';
import { useImageZoom } from '../../../../hooks/use-zoom-image';

import classes from './ImageContainer.module.css';

const ImageContainer = ({ images }) => {
    const [currentImage, setCurrrentImage] = useState('');
    const imagePreviewRefs = useRef([]);

    useEffect(() => {
        if (images[0]) setCurrrentImage(images[0]);
    }, [images]);

    const {
        moveLens,
        imgDimesions,
        lensDimensions,
        previewLensDimensions,
        previewImgDimensions,
        imgContainerDimesions,
        imgRefCallback,
        meshRefCallback,
        imagePreviewRefCallback,
    } = useImageZoom({
        imgHeight: 485,
        imgWidth: 500,
        lensHeight: 200,
        lensWidth: 200,
        previewLensHeight: 600,
    });

    const onMouseOverHandler = (img, i) => {
        imagePreviewRefs.current[i].classList.add(classes['active']);
        images.forEach((_, j) => {
            if (i !== j)
                imagePreviewRefs.current[j].classList.remove(classes['active']);
        });
        setCurrrentImage(img);
    };

    const addRefs = (el) => {
        if (el && !imagePreviewRefs.current.includes(el)) {
            imagePreviewRefs.current.push(el);
        }
    };
    return (
        <div className={classes['image-container']}>
            <div className={classes['image__previews-container']}>
                <div className={classes['image__previews-selector']}>
                    {images.map((img, i) => (
                        <div
                            className={
                                i === 0
                                    ? `${classes['img-wrapper']} ${classes['active']}`
                                    : `${classes['img-wrapper']}`
                            }
                            key={img._id}
                            onMouseOver={onMouseOverHandler.bind(null, img, i)}
                            ref={addRefs}>
                            <img src={img.url} alt='product preview' />
                        </div>
                    ))}
                </div>
                <div
                    className={classes['image__previews']}
                    onMouseMove={moveLens}
                    style={{ ...imgContainerDimesions }}>
                    <img
                        src={currentImage.url}
                        alt='product prview'
                        style={{ ...imgDimesions }}
                        ref={imgRefCallback}
                    />
                    <div
                        ref={meshRefCallback}
                        style={{ ...lensDimensions }}
                        className={classes.mesh}></div>
                </div>
                <div
                    className={classes['magnified-container']}
                    style={{
                        ...previewLensDimensions,
                    }}>
                    <img
                        src={currentImage.url}
                        alt='magnified product'
                        ref={imagePreviewRefCallback}
                        style={{
                            ...previewImgDimensions,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageContainer;
