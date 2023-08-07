import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faCaretDown,
    faCartShopping,
} from '@fortawesome/free-solid-svg-icons';

import SearchBar from '../../SearchBar/SearchBar';
import MobileNavBar from './MobileNavBar/MobileNavBar';
import NavItemCard from './NavItemCard/NavItemCard';
import LoadingBar from '../../LoadingBar/LoadingBar';
import Modal from '../../Modal/Modal';
import classes from './MainNavBar.module.css';

const MainNavBar = ({ isNavigating }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showNavCard, setShowNavCard] = useState(false);
    const { address, quickAddress } = useSelector((state) => state.address);
    const cartTotalItem = useSelector((state) => state.cart.total);
    const { username, isAuthenticated } = useSelector((state) => state.auth);
    const [navAddress, setNavAddress] = useState(null);

    const handleModalToggle = () => {
        setIsModalOpen((prevState) => !prevState);
    };

    const handleMouseOver = () => {
        setShowNavCard(true);
    };

    const handleMouseLeave = () => {
        setShowNavCard(false);
    };

    useEffect(() => {
        if (quickAddress) {
            setNavAddress(quickAddress);
        } else if (address) {
            setNavAddress({
                Name: address.city,
                Pincode: address.pincode,
            });
        }
    }, [address, quickAddress]);

    return (
        <>
            {isModalOpen && (
                <Modal
                    address={address}
                    onConfirm={handleModalToggle}
                    title='Choose Your Location'
                />
            )}
            <div className={classes['sticky']}>
                {isNavigating && <LoadingBar></LoadingBar>}
                <nav className={classes.nav} id='nav-bar'>
                    <div className={classes['desktop__nav-items']}>
                        <div className={classes.container}>
                            <Link
                                className={`${classes['nav-link']} ${classes['nav__logo-link']}`}
                                to='/'>
                                <div className={classes['nav-logo']}>
                                    <img
                                        src={require('../../../images/amazon-logo-white.png')}
                                        alt='amazon logo'
                                    />
                                    <span>.in</span>
                                </div>
                            </Link>
                        </div>
                        <div className={classes.container}>
                            <div
                                className={`${classes['nav-link']} ${classes['nav__address-link']}`}
                                onClick={handleModalToggle}>
                                <span>
                                    {navAddress ? 'Delivery to' : 'Hello'}
                                </span>
                                <div className={classes.content}>
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        size='sm'
                                        className={classes['location-dot']}
                                    />
                                    <span
                                        className={`${classes['content-heading']} ${classes['ellipsis']}`}>
                                        {navAddress
                                            ? `${navAddress.Name} ${navAddress.Pincode}`
                                            : 'Select Your Address'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${classes.container} ${classes['search-bar__container']}`}>
                            <SearchBar display='desktop' />
                        </div>
                        <div
                            className={`${classes.container} ${classes.account}`}>
                            <div
                                onMouseEnter={handleMouseOver}
                                onMouseLeave={handleMouseLeave}
                                className={`${classes['nav-link']} ${classes['nav__account-link']}`}>
                                <span className={classes['ellipsis']}>
                                    Hello,{' '}
                                    {`${
                                        isAuthenticated ? username : 'sign in'
                                    }`}
                                </span>
                                <div className={classes.content}>
                                    <span
                                        className={classes['content-heading']}>
                                        Accounts & Lists
                                    </span>
                                    <FontAwesomeIcon
                                        icon={faCaretDown}
                                        size='sm'
                                        className={classes['caret-down']}
                                    />
                                </div>
                            </div>
                            {showNavCard && (
                                <NavItemCard
                                    isAuthenticated={isAuthenticated}
                                    handleMouseOver={handleMouseOver}
                                    handleMouseLeave={handleMouseLeave}
                                />
                            )}
                        </div>
                        <div
                            className={`${classes.container} ${classes.orders}`}>
                            <Link
                                to='/orders'
                                className={`${classes['nav-link']} ${classes['nav__orders-link']}`}>
                                <span>Returns</span>
                                <div className={classes.content}>
                                    <span
                                        className={classes['content-heading']}>
                                        & Orders
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className={`${classes.container} ${classes.cart}`}>
                            <Link
                                to='/cart'
                                className={`${classes['nav-link']} ${classes['nav__cart-link']}`}>
                                <div className={classes['item-1']}>
                                    <FontAwesomeIcon
                                        icon={faCartShopping}
                                        size='xs'
                                        className={classes['cart-icon']}
                                    />
                                </div>
                                <div className={classes['item-2']}>
                                    <span
                                        className={classes['cart-total-item']}>
                                        {cartTotalItem > 9
                                            ? '9+'
                                            : cartTotalItem}
                                    </span>
                                    <span
                                        className={classes['content-heading']}>
                                        Cart
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <MobileNavBar isAuthenticated={isAuthenticated} />
                </nav>
            </div>
        </>
    );
};

export default MainNavBar;
