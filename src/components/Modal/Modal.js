import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';
import classes from './Modal.module.css';

const Modal = function (props) {
    const [pinCode, setPinCode] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, []);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setShowError(false);
        fetch('https://api.postalpincode.in/pincode/' + pinCode)
            .then((res) => {
                if (!res.ok) throw new Error('Something went wrong');
                return res.json();
            })
            .then((data) => {
                if (data[0].Status !== 'Success') return setShowError(true);
                console.log(data[0].PostOffice[0].Name);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const Backdrop = (props) => {
        return (
            <div className={classes.backdrop} onClick={props.onConfirm}></div>
        );
    };

    const ModalOverlay = (props) => {
        return (
            <div className={classes.modal}>
                <header className={classes.header}>
                    <h4>{props.title || 'Choose Your location'}</h4>
                </header>
                <div className={classes['modal-content']}>
                    <p>
                        Select a delivery location to see product availability
                        and delivery options
                    </p>
                    <Button>Sign in to see your address</Button>
                    <div className={classes.container}>
                        <span className={classes.line}></span>
                        <span className={classes.text}>
                            or enter your pincode
                        </span>
                        <span className={classes.line}></span>
                    </div>
                    <form
                        className={classes['form-control']}
                        onSubmit={formSubmitHandler}>
                        <input
                            type='text'
                            name='pincode'
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                        <Button type='submit'>Apply</Button>
                        {showError && <p>Please enter valid pincode</p>}
                    </form>
                </div>
                <footer className={classes.footer}>
                    <Button onClick={props.onConfirm}>Close</Button>
                </footer>
            </div>
        );
    };

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    onConfirm={props.onConfirm}
                    title={props.title}
                />,
                document.getElementById('overlay-root')
            )}
        </>
    );
};

export default Modal;
