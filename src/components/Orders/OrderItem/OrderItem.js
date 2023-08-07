import { Link } from 'react-router-dom';

import classes from './OrderItem.module.css';

const OrderItem = ({ products }) => {
    return (
        <div className={classes['product-container']}>
            <div className={classes['product-img']}>
                <img
                    src={products.productId.images[0].url}
                    alt={products.productId.title}
                />
            </div>
            <div className={classes['product-content']}>
                <Link to={`/products/${products.productId._id}`}>
                    <h4 className={classes['product-title']}>
                        {products.productId.title}
                    </h4>
                </Link>
                <h5 className={classes['product-price']}>
                    Price: ₹{products.price}
                </h5>
                <span className={classes['product-quantity']}>
                    {products.quantity}{' '}
                    {products.quantity < 2 ? 'item' : 'items'}
                </span>
            </div>
        </div>
    );
};

export default OrderItem;
