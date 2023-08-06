import axios from 'axios';

export const fileUpload = async (files, fileUploadProgressHandler) => {
    const imageUrls = [];
    // Create copy of files array
    const filesCopy = [...files];
    for (let file of files) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append(
                'upload_preset',
                process.env.REACT_APP_CLOUDINARY_PRESET_NAME
            );
            formData.append(
                'api_key',
                process.env.REACT_APP_CLOUDINARY_API_KEY
            );
            formData.append('timestamp', (Date.now() / 1000) | 0);
            // Create copy of file
            let newFile = file;
            const config = {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 80) / progressEvent.total
                    );

                    // ... and set the progress
                    newFile.progress = percentCompleted;
                    // Find the index of the file object
                    let fileIndex = filesCopy.findIndex(
                        (el) => el.name === newFile.name
                    );
                    //... and replace the object with the new one containing the [progress] key
                    filesCopy[fileIndex] = newFile;
                    // Finally, update the state
                    fileUploadProgressHandler(filesCopy);
                    newFile.progress = percentCompleted;
                },
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            };

            const res = await axios.post(
                process.env.REACT_APP_CLOUDINARY_URL,
                formData,
                config
            );
            const { data } = res;

            imageUrls.push({
                url: data.url,
                filename: data.public_id,
            });
            newFile.progress = 100;
        } catch (e) {
            console.error('Could not upload image');
        }
    }

    return imageUrls;
};

export const deleteImage = async (files) => {
    const formData = new FormData();
    formData.append('files', JSON.stringify(files));
    try {
        const res = await fetch(
            `${process.env.REACT_APP_REST_API_URL}/products`,
            {
                method: 'DELETE',
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (!res.ok) throw new Error('Something Went wrong!');
    } catch (e) {
        console.error('Could not delete image');
    }
};
