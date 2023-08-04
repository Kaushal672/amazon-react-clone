import ReactDOM from 'react-dom';

import ModalCard from '../ModalCard/ModalCard';
import Backdrop from '../Backdrop/Backdrop';
import classes from './ErrorModal.module.css';

const ErrorModal = ({ onConfirm, data, error }) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalCard
                    title={'Error!!'}
                    style={{ color: 'red' }}
                    onConfirm={onConfirm}>
                    <h5 className={classes.message}>
                        {data.length > 0 ? 'Validation Failed!' : error}
                    </h5>
                    {data.length > 0 && (
                        <ul>
                            {data.map((el, i) => (
                                <li key={i}>
                                    {el.path} : {el.msg}
                                </li>
                            ))}
                        </ul>
                    )}
                </ModalCard>,
                document.getElementById('overlay-root')
            )}
        </>
    );
};

export default ErrorModal;
