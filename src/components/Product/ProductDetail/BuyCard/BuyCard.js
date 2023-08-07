import { Link, useFetcher } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import FBABadge from '../FBABadge/FBABadge';
import Button from '../../../Button/Button';
import WhiteBackdrop from '../../../Backdrop/WhiteBackdrop/WhiteBackdrop';
import classes from './BuyCard.module.css';

const BuyCard = ({ originalPrice, formattedPrice, id, company }) => {
    const date = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const { Form, state } = useFetcher();
    const options = { day: 'numeric', month: 'long', weekday: 'long' };
    const formatedDate = new Intl.DateTimeFormat(
        navigator.language,
        options
    ).format(date);

    const address = useSelector((state) => state.address.address);

    return (
        <div className={classes['card-container']}>
            {state !== 'idle' &&
                ReactDOM.createPortal(
                    <WhiteBackdrop />,
                    document.getElementById('nav-backdrop-root')
                )}
            <h3 className={classes['card-heading']}>Chekcout Here</h3>
            <p className={classes['card-price']}>
                Price:{' '}
                <span className={classes['format-price']}>
                    ₹{formattedPrice}
                </span>
                <span className={classes['original-price']}>
                    ₹<span>{originalPrice}</span>
                </span>
            </p>
            <FBABadge />
            {formattedPrice > 499 && (
                <span className={classes['fd']}>FREE delivary</span>
            )}
            <span className={classes['order-prompt']}>
                Order Now & Get it by{' '}
                <span className={classes['delivery-date']}>{formatedDate}</span>
            </span>
            {address && (
                <Link
                    preventScrollReset={true}
                    to='/address'
                    className={classes['address-link']}>
                    <FontAwesomeIcon icon={faLocationDot} /> Delivery to{' '}
                    {address.fullName} {address.addressline} {address.city}
                </Link>
            )}
            {!address && (
                <Link
                    preventScrollReset={true}
                    to='/address'
                    className={classes['address-link']}>
                    Add address
                </Link>
            )}
            <span className={classes.seller}>Sold by {company} </span>
            <div className={classes.actions}>
                <Form action='/cart?index' method='POST'>
                    <Button name='productId' value={id} type='submit'>
                        Add to Cart
                    </Button>
                </Form>
                <Form action='/orders' method='POST'>
                    <Button type='submit' name='productId' value={id}>
                        Buy Now
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default BuyCard;
