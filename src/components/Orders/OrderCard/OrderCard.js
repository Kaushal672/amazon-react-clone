import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import OrderItem from '../OrderItem/OrderItem';
import classes from './OrderCard.module.css';

const OrderCard = ({ order }) => {
    const date = dayjs(order.createdAt).format('DD-MMM-YYYY');
    return (
        <div className={classes['orders__card']}>
            <h4 className={classes['order__card-id']}>Order #{order._id} </h4>
            {order.products.map((prod) => (
                <OrderItem key={prod._id} products={prod} />
            ))}
            <hr />
            <div className={classes['orders__card-footer']}>
                <span className={classes['orders__card-order-date']}>
                    Purchased on {date}
                </span>
                <Link
                    className={classes['invoice-link']}
                    to={order.invoice.url}
                    download>
                    Download Invoice
                </Link>
                <span className={classes['orders__card-total']}>
                    <strong>Total: ₹{order.total}</strong>
                </span>
            </div>
        </div>
    );
};

export default OrderCard;
