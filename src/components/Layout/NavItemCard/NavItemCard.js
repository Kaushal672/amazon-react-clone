import { useRef } from 'react';
import ReactDOM from 'react-dom';
import Button from '../../Button/Button';
import classes from './NavItemCard.module.css';

const NavItemCard = (props) => {
    const wrapperRef = useRef(null);
    const NavItemBackdrop = () => {
        return <div className={classes['nav-backdrop']}></div>;
    };

    return (
        <div className={classes.wrapper} ref={wrapperRef}>
            {ReactDOM.createPortal(
                <div>
                    <NavItemBackdrop />
                </div>,
                document.getElementById('nav-backdrop-root')
            )}
            <div
                className={`${classes.container} ${classes.pointer}`}
                onMouseOver={props.handleMouseOver}
                onMouseLeave={props.handleMouseLeave}>
                <div className={classes['sign-in']}>
                    <Button>Sign In</Button>
                    <span className={classes['new-user']}>
                        New Customer? <a href=''>Start here.</a>
                    </span>
                </div>
                <hr />
                <h3 className={classes.title}>Your Account</h3>
                <ul className={classes['nav-items']}>
                    <li className={classes['nav-item']}>
                        <a href=''>Your Account</a>
                    </li>
                    <li className={classes['nav-item']}>
                        <a href=''>Your Orders</a>
                    </li>
                    <li className={classes['nav-item']}>
                        <a href=''>Your Wishlist</a>
                    </li>
                    <li className={classes['nav-item']}>
                        <a href=''>Your Seller Account</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavItemCard;
