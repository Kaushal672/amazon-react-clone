// credits: github.com/simbathesailor/react-image-zoom-hook

import { useState, useEffect, useCallback } from 'react';

function useImageZoom({
    imgHeight,
    imgWidth,
    lensHeight,
    lensWidth,
    previewLensHeight,
}) {
    const [imgElemInState, setimgElemInState] = useState(null);
    const [meshElemInState, setmeshElemInState] = useState(null);

    const [imagePreviewELemInState, setimagePreviewELemInState] =
        useState(null);

    const calculateDimensions = useCallback(() => {
        const imgToLensRatioHeight = imgHeight / lensHeight;
        const imgToLensRatioWidth = imgWidth / lensWidth;
        const lensDimensionRatio = lensWidth / lensHeight;
        const previewLensWidth = lensDimensionRatio * previewLensHeight;
        const imgPreviewHeight = imgToLensRatioHeight * previewLensHeight;
        const imgPreviewWidth = imgToLensRatioWidth * previewLensWidth;

        return {
            imgHeight,
            imgWidth,
            lensHeight,
            lensWidth,
            previewLensHeight,
            imgPreviewHeight,
            imgPreviewWidth,
            previewLensWidth,
        };
    }, [imgHeight, imgWidth, lensHeight, lensWidth, previewLensHeight]);

    const [zoomDimensions, setZoomDimensions] = useState(() => {
        return calculateDimensions();
    });

    useEffect(() => {
        const newZoomDimensions = calculateDimensions();
        setZoomDimensions(newZoomDimensions);
    }, [
        imgHeight,
        lensHeight,
        imgWidth,
        lensWidth,
        previewLensHeight,
        calculateDimensions,
    ]);
    const getCursorPos = useCallback(
        (e) => {
            let a;
            let x = 0;
            let y = 0;
            const img = imgElemInState;
            if (img) {
                e = e || window.event;
                /* Get the x and y positions of the image: */
                a = img.getBoundingClientRect();
                /* Calculate the cursor's x and y coordinates, relative to the image: */
                x = e.pageX - a.left;
                y = e.pageY - a.top;
                /* Consider any page scrolling: */
                x = x - window.pageXOffset;
                y = y - window.pageYOffset;
            }
            return { x: x, y: y };
        },
        [imgElemInState]
    );
    const moveLens = useCallback(
        (e) => {
            let pos, x, y;
            /* Prevent any other actions that may occur when moving over the image */
            e.preventDefault();
            /* Get the cursor's x and y positions: */
            const lens = meshElemInState;
            const img = imgElemInState;
            const imgPreview = imagePreviewELemInState;
            if (!img || !imgPreview || !lens) return;

            const cx = imgPreview.offsetWidth / img.offsetWidth;
            const cy = imgPreview.offsetHeight / img.offsetHeight;
            pos = getCursorPos(e);
            /* Calculate the position of the lens: */
            x = pos.x - lens.offsetWidth / 2;
            y = pos.y - lens.offsetHeight / 2;
            /* Prevent the lens from being positioned outside the image: */
            if (x > img.width - lens.offsetWidth) {
                x = img.width - lens.offsetWidth;
            }
            if (x < 0) {
                x = 0;
            }
            if (y > img.height - lens.offsetHeight) {
                y = img.height - lens.offsetHeight;
            }
            if (y < 0) {
                y = 0;
            }
            /* Set the position of the lens: */
            lens.style.left = x + 'px';
            lens.style.top = y + 'px';
            /* Display what the lens "sees": */
            let finaltranslateX = x * cx;
            let finaltranslateY = y * cy;

            imgPreview.style.transform = `translate3d(${-finaltranslateX}px, ${-finaltranslateY}px, 0px)`;
        },
        [meshElemInState, imgElemInState, imagePreviewELemInState, getCursorPos]
    );
    /**
     * Need to segregate the state value for better usage of this library
     * imgDimesion
     * lensDimension,
     * previewLensDimension
     * previewImgDimension
     */
    const imgRefCallback = useCallback((node) => {
        setimgElemInState(node);
    }, []);

    const meshRefCallback = useCallback((node) => {
        setmeshElemInState(node);
    }, []);

    const imagePreviewRefCallback = useCallback((node) => {
        setimagePreviewELemInState(node);
    }, []);

    const {
        imgHeight: imgHeightInState,
        imgWidth: imgWidthInState,
        lensHeight: lensHeightInState,
        lensWidth: lensWidthInState,
        previewLensHeight: previewLensHeightInState,
        previewLensWidth: previewLensWidthInState,
        imgPreviewHeight: imgPreviewHeightInState,
        imgPreviewWidth: imgPreviewWidthInState,
    } = zoomDimensions;

    /**
     * Segregating the style props for various zoom Ui elements
     */

    const imgContainerDimesions = {
        height: `${imgHeightInState}px`,
        width: `${imgWidthInState}px`,
        position: `relative`,
    };
    const imgDimesions = {
        height: '100%',
        width: '100%',
    };

    const lensDimensions = {
        height: `${lensHeightInState}px`,
        width: `${lensWidthInState}px`,
        position: 'absolute',
    };

    const previewLensDimensions = {
        height: `${previewLensHeightInState}px`,
        width: `${previewLensWidthInState}px`,
        overflow: 'hidden',
    };
    const previewImgDimensions = {
        height: `${imgPreviewHeightInState}px`,
        width: `${imgPreviewWidthInState}px`,
    };

    return {
        moveLens,
        imgContainerDimesions,
        imgDimesions,
        lensDimensions,
        previewLensDimensions,
        previewImgDimensions,
        imgRefCallback,
        meshRefCallback,
        imagePreviewRefCallback,
    };
}
export { useImageZoom };
