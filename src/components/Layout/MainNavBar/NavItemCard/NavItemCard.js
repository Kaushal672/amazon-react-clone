import { NavLink, Form, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import Button from '../../../Button/Button';
import classes from './NavItemCard.module.css';

const NavItemCard = ({
    handleMouseLeave,
    handleMouseOver,
    isAuthenticated,
}) => {
    const NavItemBackdrop = () => {
        return (
            <div
                onClick={handleMouseLeave}
                className={classes['nav-backdrop']}
                style={{ height: `100%` }}></div>
        );
    };
    const navLinkClass = ({ isActive, isPending }) =>
        isPending ? classes['pending'] : isActive ? classes['active'] : '';

    return (
        <>
            {ReactDOM.createPortal(
                <NavItemBackdrop />,
                document.getElementById('nav-backdrop-root')
            )}
            <div
                className={`${classes.container} ${classes.pointer}`}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}>
                <div className={classes['sign-in']}>
                    {!isAuthenticated && (
                        <>
                            <Button mode='link' to='/auth?mode=login'>
                                Sign In
                            </Button>
                            <span className={classes['new-user']}>
                                New Customer?{' '}
                                <Link to='/auth?mode=signup'>Start here.</Link>
                            </span>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <Form action='/logout' method='post'>
                                <Button type='submit'>Sign out</Button>
                            </Form>
                            <Form action='/logout' method='post'>
                                <input
                                    type='text'
                                    defaultValue='/auth?mode=login'
                                    name='returnTo'
                                    hidden={true}
                                />
                                <span>Switch account? </span>
                                <button type='submit'>Click here.</button>
                            </Form>
                        </>
                    )}
                </div>
                <hr />

                <h3 className={classes.title}>Your Account</h3>
                <ul className={classes['nav-items']}>
                    <li className={classes['nav-item']}>
                        <NavLink to='/account' className={navLinkClass}>
                            Your Account
                        </NavLink>
                    </li>
                    <li className={classes['nav-item']}>
                        <NavLink className={navLinkClass} to='/orders'>
                            Your Orders
                        </NavLink>
                    </li>
                    <li className={classes['nav-item']}>
                        <NavLink className={navLinkClass} to='/seller-account'>
                            Your Seller Account
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default NavItemCard;
