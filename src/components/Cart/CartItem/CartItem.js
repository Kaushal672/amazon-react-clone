import ReactDOM from 'react-dom';
import { useFetcher } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import FBABadge from '../../Product/ProductDetail/FBABadge/FBABadge';
import WhiteBackdrop from '../../Backdrop/WhiteBackdrop/WhiteBackdrop';
import classes from './CartItem.module.css';

const CartItem = ({ item }) => {
    const fetcher = useFetcher();
    const { Form, submit, state } = fetcher;

    const onChangeHandler = (e) => {
        const formData = new FormData(e.currentTarget);
        formData.append('productId', item.productId._id);
        formData.append('replace', true);
        submit(formData, {
            action: '/cart/?index',
            method: 'POST',
        });
    };

    return (
        <div className={classes['cart-item__wrapper']}>
            {state !== 'idle' &&
                ReactDOM.createPortal(
                    <WhiteBackdrop />,
                    document.getElementById('nav-backdrop-root')
                )}
            <div className={classes['cart-item__image']}>
                <img src={item.productId.images[0].url} alt='cart item' />
            </div>
            <div className={classes['cart-item__details']}>
                <Link to={`/products/${item.productId._id}`}>
                    <h3>{item.productId.title}</h3>
                </Link>
                <div className={classes['cart-item__mobile-price']}>
                    <span>₹{item.productId.formattedPrice}</span>
                </div>
                <h5 className={classes['cart-item__category']}>
                    in {item.productId.category}
                </h5>
                <FBABadge className={classes['cart-item__badge']} />
                <div className={classes['cart-item__actions']}>
                    <Form onChange={onChangeHandler}>
                        <label
                            htmlFor={`quantity${item.productId._id}`}
                            className={classes['quantity']}>
                            Qty:{' '}
                            <select
                                name='quantity'
                                id={`quantity${item.productId._id}`}
                                defaultValue={item.quantity}
                                className={classes['cart-item__select']}>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <FontAwesomeIcon size='xs' icon={faAngleDown} />
                        </label>
                    </Form>
                    |
                    <Form method='delete'>
                        <input
                            type='text'
                            hidden={true}
                            name='productId'
                            defaultValue={item.productId._id}
                        />
                        <button type='submit'>Remove</button>
                    </Form>
                </div>
            </div>
            <div className={classes['cart-item__price']}>
                <span>₹{item.productId.formattedPrice}</span>
            </div>
        </div>
    );
};

export default CartItem;
