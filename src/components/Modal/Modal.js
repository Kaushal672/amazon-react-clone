import { useEffect } from 'react';
import { Link, useFetcher } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();
    const { data, state, Form } = fetcher;
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, []);

    useEffect(() => {
        if (state === 'idle' && data && data[0].Status === 'Success') {
            dispatch(addressActions.setQuickAddress(data[0].PostOffice[0]));
            onConfirm();
        }
    }, [data, state, dispatch, onConfirm]);

    const ModalOverlay = ({ title, onConfirm }) => {
        return (
            <ModalCard title={title} onConfirm={onConfirm}>
                <p className={classes['desc']}>
                    Select a delivery location to see product availability and
                    delivery options
                </p>
                {address && (
                    <div className={classes['default-address']}>
                        <span>Your default address</span>
                        <ul>
                            <li>{address.fullName}</li>
                            <li>{address.addressline}</li>
                            <li>{address.city}</li>
                            <li>
                                {address.state}, {address.country},
                                {address.pincode}
                            </li>
                        </ul>
                    </div>
                )}
                {isAuthenticated && (
                    <Link
                        onClick={onConfirm}
                        to='/address'
                        className={classes['address-link']}>
                        Add new address
                    </Link>
                )}
                {!isAuthenticated && (
                    <Button
                        mode={'link'}
                        to='/auth?mode=login'
                        onClick={onConfirm}>
                        Sign in to see your address
                    </Button>
                )}
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
