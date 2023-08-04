import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import AddressCard from './AddressCard/AddressCard';
import classes from './Address.module.css';

const Address = ({ address }) => {
    const location = useLocation();
    const flash = location.state?.flash;
    useEffect(() => {
        if (flash) window.flash(flash);
    }, [flash]);

    return (
        <div className={classes['address-wrapper']}>
            <h1>Your Addresses</h1>
            <div className={classes['address-container']}>
                <Link to='new' className={classes['address-add-card']}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        size='3x'
                        color={'#c8c8c8'}
                    />
                    <h3>Add Address</h3>
                </Link>
                {address.map((el, i) => (
                    <AddressCard address={el} key={el._id} />
                ))}
            </div>
        </div>
    );
};

export default Address;
