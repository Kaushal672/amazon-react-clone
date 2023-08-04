import OrderCard from './OrderCard/OrderCard';
import classes from './Orders.module.css';

const Orders = ({ orders }) => {
    return (
        <div className={classes['order-container']}>
            {orders.length > 0 && (
                <>
                    <h1>Your Recent Orders</h1>
                    {orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </>
            )}
            {orders.length === 0 && (
                <h1 style={{ textAlign: 'center' }}>No Orders made yet!!</h1>
            )}
        </div>
    );
};

export default Orders;
