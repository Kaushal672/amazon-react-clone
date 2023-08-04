import AccountCard from './AccountCard/AccountCard';
import classes from './Account.module.css';

const Account = () => {
    return (
        <>
            <div className={classes['account-container']}>
                <h1 className={classes['account-heading']}>Your Account</h1>
                <AccountCard
                    img={require('../../images/amazon-box.png')}
                    title='Your Orders'
                    path='/orders'
                    description='Review your orders'
                />
                <AccountCard
                    img={require('../../images/lock vector.png')}
                    title='Login & Security'
                    path='/account/edit'
                    description='Edit login, name and mobile number'
                />
                <AccountCard
                    img={require('../../images/location dot.png')}
                    title='Your Addresses'
                    path='/address'
                    description='Edit addresses for your orders'
                />
            </div>
        </>
    );
};

export default Account;
