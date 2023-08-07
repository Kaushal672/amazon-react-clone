import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTriangleExclamation,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';

import Bus from '../../utils/Bus';
import classes from './Flash.module.css';

const Flash = () => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        let timer;
        Bus.addListener('flash', (message) => {
            setShow(true);
            setMessage(message);
            timer = setTimeout(() => {
                setShow(false);
            }, 4000);
        });

        return () => {
            clearTimeout(timer);
            Bus.removeAllListeners();
        };
    }, []);

    return (
        show && (
            <div className={classes['flash']}>
                <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    color='red'
                    size='lg'
                />
                <p>{message}</p>
                <FontAwesomeIcon
                    size='lg'
                    icon={faXmark}
                    className={classes['close']}
                    onClick={() => setShow(false)}
                />
            </div>
        )
    );
};

export default Flash;
