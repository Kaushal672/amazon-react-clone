import { useEffect } from 'react';
import { Link, useFetcher } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { addressActions } from '../../store';

import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button';
import ModalCard from '../ModalCard/ModalCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import classes from './Modal.module.css';

const Modal = ({ onConfirm, title, address }) => {
    const fetcher = useFetcher();
    const { data, state, Form } = fetcher;

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

    const ModalOverlay = ({ title, onConfirm }) => {
        return (
            <ModalCard title={title} onConfirm={onConfirm}>
                <p className={classes['desc']}>
                    Select a delivery location to see product availability and
                    delivery options
                </p>
                <div className={classes.container}>
                    <span className={classes.line}></span>
                    <span className={classes.text}>or enter your pincode</span>
                    <span className={classes.line}></span>
                </div>
                {state !== 'idle' && <LoadingSpinner />}
                {state === 'idle' && (
                    <>
                        <Form
                            className={classes['form']}
                            method='post'
                            action='/address'>
                            <input type='text' name='pincode' />
                            <Button type='submit'>Apply</Button>
                        </Form>
                        {data && data[0].Status !== 'Success' && (
                            <p className={classes.error}>{data[0].Message}</p>
                        )}
                    </>
                )}
            </ModalCard>
        );
    };

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay onConfirm={onConfirm} title={title} />,
                document.getElementById('overlay-root')
            )}
        </>
    );
};

export default Modal;

export async function action({ request }) {
    const data = await request.formData();
    const pinCode = data.get('pincode');

    const res = await fetch('https://api.postalpincode.in/pincode/' + pinCode);
    if (!res.ok) {
        return res;
    }

    return res;
}
