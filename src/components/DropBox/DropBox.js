import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';
import DropBoxOverlay from '../DropBoxOverlay/DropBoxOverlay';

const DropBox = ({ onConfirm, uploadedFilesHandler, uploadedFiles }) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <DropBoxOverlay
                    uploadedFilesHandler={uploadedFilesHandler}
                    onConfirm={onConfirm}
                    uploadedFiles={uploadedFiles}
                />,
                document.getElementById('overlay-root')
            )}
        </>
    );
};

export default DropBox;
