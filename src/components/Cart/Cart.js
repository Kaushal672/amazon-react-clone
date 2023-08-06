import { Link, useFetcher } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleExclamation,
    faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

import cartLogo from '../../images/empty-cart.svg';
import CartItem from './CartItem/CartItem';
import Button from '../Button/Button';
import WhiteBackdrop from '../Backdrop/WhiteBackdrop/WhiteBackdrop';
import classes from './Cart.module.css';

const Cart = ({ cart }) => {
    const { state, Form } = useFetcher();

    return (
        <div className={classes['cart-wrapper']}>
            {state !== 'idle' &&
                ReactDOM.createPortal(
                    <WhiteBackdrop />,
                    document.getElementById('nav-backdrop-root')
                )}
            <div className={classes.cart}>
                {cart.items.length === 0 && (
                    <div className={classes['cart-empty__container']}>
                        <div className={classes['cart-empty__logo']}>
                            <img src={cartLogo} alt='cart empty logo' />
                        </div>
                        <div className={classes['cart-empty__content']}>
                            <h2>Your Amazon cart is empty</h2>
                            <p>
                                Your shopping cart is waiting. Give it purpose –
                                fill it with groceries, clothing, household
                                supplies, electronics and more. Continue
                                shopping on the <Link to='/'>Amazon</Link>{' '}
                                homepage, learn about today's deals, or visit
                                your Wish List.
                            </p>
                            <Button mode='link' to='/'>
                                Shop Now!!
                            </Button>
                        </div>
                    </div>
                )}
                {cart.items.length > 0 && (
                    <div className={classes['cart-content']}>
                        <div className={classes.header}>
                            <h2>Shopping Cart</h2>
                            <span>Price</span>
                        </div>
                        {cart.items.map((item, i) => (
                            <CartItem key={item.productId._id} item={item} />
                        ))}
                        <div className={classes['total-amount']}>
                            <span>Subtotal: ₹{cart.total}</span>
                        </div>
                    </div>
                )}
            </div>
            {cart.items.length > 0 && (
                <div className={classes['total-amount-container']}>
                    {cart.total > 499 && (
                        <div className={classes['fd-cert']}>
                            <FontAwesomeIcon
                                size='lg'
                                icon={faCircleCheck}
                                style={{ color: '#31b12f' }}
                            />
                            <span>
                                Your order is eligible for FREE Delivery.
                            </span>
                        </div>
                    )}
                    {cart.total <= 499 && (
                        <div className={classes['fd-cert']}>
                            <FontAwesomeIcon
                                size='lg'
                                icon={faCircleExclamation}
                                style={{ color: '#5ca3e6' }}
                            />
                            <span>
                                Add <span>₹{499 - cart.total}</span> of eligible
                                items to your order to qualify for FREE
                                Delivery.
                            </span>
                        </div>
                    )}
                    <h3>Subtotal: ₹{cart.total}</h3>
                    <Form action='/orders' method='POST'>
                        <Button name='mode' value='cart' type='submit'>
                            Proceed to Buy
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default Cart;
