import { useRef, useState } from 'react';
import { NavLink, Link, Form } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import Backdrop from '../../../Backdrop/Backdrop';
import SearchBar from '../../../SearchBar/SearchBar';
import classes from './MobileNavBar.module.css';

const MobileNavBar = ({ isAuthenticated }) => {
    const mobileNavRef = useRef(null);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const mobileNavToggleHandler = () => {
        mobileNavRef.current.classList.toggle(classes['open']);
        setIsMobileNavOpen((prevState) => !prevState);
    };

    const navLinkClasses = ({ isActive, isPending }) =>
        isPending
            ? `${classes['pending']} ${classes['nav-link__list-item']}`
            : isActive
            ? `${classes['active']} ${classes['nav-link__list-item']}`
            : classes['nav-link__list-item'];

    return (
        <div className={classes['mobile-nav__wrapper']}>
            {isMobileNavOpen &&
                ReactDOM.createPortal(
                    <Backdrop onConfirm={mobileNavToggleHandler} />,
                    document.getElementById('backdrop-root')
                )}
            <div ref={mobileNavRef} className={classes['mobile-nav-sidebar']}>
                <div className={classes['nav-header']}>
                    <Link
                        className={classes['nav-link']}
                        to='/account'
                        onClick={mobileNavToggleHandler}>
                        Your Account <FontAwesomeIcon icon={faUser} />
                    </Link>
                    <Link
                        aria-label='home page'
                        to='/'
                        onClick={mobileNavToggleHandler}
                    />
                </div>
                <ul className={classes['nav-link__list']}>
                    <li className={classes['nav-link-home']}>
                        <NavLink
                            onClick={mobileNavToggleHandler}
                            aria-label='amazon homepage'
                            to='/'
                            className={navLinkClasses}>
                            Amazon Home <FontAwesomeIcon icon={faHouse} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={mobileNavToggleHandler}
                            to='/orders'
                            className={navLinkClasses}>
                            Your Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={mobileNavToggleHandler}
                            to='/cart'
                            className={navLinkClasses}>
                            Your Cart
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={mobileNavToggleHandler}
                            to='/seller-account'
                            className={navLinkClasses}>
                            Your Seller Account
                        </NavLink>
                    </li>
                    <li>
                        {isAuthenticated && (
                            <Form
                                onSubmit={mobileNavToggleHandler}
                                action='/logout'
                                method='post'
                                className={classes['logout-form']}>
                                <button type='submit'>Sign out</button>
                            </Form>
                        )}
                        {!isAuthenticated && (
                            <NavLink
                                onClick={mobileNavToggleHandler}
                                to='/auth?mode=login'
                                className={navLinkClasses}>
                                Login
                            </NavLink>
                        )}
                    </li>
                </ul>
            </div>
            <div className={classes['mobile-nav-bar']}>
                <Link to='/' className={classes['mobile-logo']}>
                    <img
                        src={require('../../../../images/amazon-logo-white.png')}
                        alt='amazon logo'
                    />
                    <span>.in</span>
                </Link>
                <div className={classes['mobile-search-bar']}>
                    <SearchBar display='mobile' />
                </div>
                <button
                    aria-label='mobile menu toggle'
                    onClick={mobileNavToggleHandler}
                    className={classes['menu-toggle']}>
                    <FontAwesomeIcon
                        rotation={isMobileNavOpen ? 90 : 0}
                        icon={faBars}
                        color={'#fff'}
                        size='xl'
                    />
                </button>
            </div>
        </div>
    );
};

export default MobileNavBar;
