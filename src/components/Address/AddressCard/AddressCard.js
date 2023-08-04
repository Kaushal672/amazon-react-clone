import { Link, Form } from 'react-router-dom';

import classes from './AddressCard.module.css';

const AddressCard = ({ address }) => {
    return (
        <div className={classes['address-card']}>
            {address.default && (
                <div className={classes['address-card__header']}>
                    <span>Default: </span>
                    <img
                        src={require('../../../images/amazon-logo-black.png')}
                        alt='address card default logo'
                    />
                </div>
            )}
            <div className={classes['address-card__content']}>
                <h5>{address.fullName}</h5>
                <p>{address.addressline} </p>
                <p>{address.city} </p>
                <p>
                    {address.state} {address.pincode}
                </p>
                <p>{address.phone}</p>
                <p>{address.country}</p>
            </div>
            <div className={classes['address-card__actions']}>
                <Link to='edit' state={{ address }}>
                    Edit
                </Link>{' '}
                {!address.default && (
                    <>
                        |{' '}
                        <Form method='delete'>
                            <input
                                type='text'
                                name='id'
                                defaultValue={address._id}
                                hidden={true}
                            />
                            <button type='submit'>Remove</button>
                        </Form>
                        |{' '}
                        <Form method='patch'>
                            <input
                                type='text'
                                name='id'
                                hidden={true}
                                defaultValue={address._id}
                            />
                            <button
                                name='intent'
                                value={'default-address'}
                                type='submit'>
                                Set as Default Address
                            </button>
                        </Form>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddressCard;
