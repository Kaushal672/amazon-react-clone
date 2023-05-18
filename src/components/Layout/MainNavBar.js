import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import classes from './MainNavBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faCaretDown,
    faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import NavItemCard from './NavItemCard/NavItemCard';
import Modal from '../Modal/Modal';

const MainNavBar = (props) => {
    const [countryCode, setCountryCode] = useState('in');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showNavCard, setShowNavCard] = useState(false);

    useEffect(() => {
        fetch('https://ipinfo.io/json?token=2fe663ab07d460')
            .then((res) => res.json())
            .then((data) => {
                setCountryCode(data.country.toLowerCase());
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const handleModalToggle = () => {
        setIsModalOpen((prevState) => !prevState);
    };

    const handleMouseOver = () => {
        setShowNavCard(true);
    };
    const handleMouseLeave = () => {
        setShowNavCard(false);
    };

    return (
        <>
            {isModalOpen && <Modal onConfirm={handleModalToggle} />}
            <header>
                <div className={classes.container}>
                    <a
                        className={`${classes['nav-link']} ${classes['nav__logo-link']}`}
                        href='#'>
                        <div className={classes['nav-logo']}>
                            <img
                                src={require('./kindpng_172246.png')}
                                alt='amazon logo'
                            />
                            <span>.{countryCode}</span>
                        </div>
                    </a>
                </div>
                <div className={`${classes.container} ${classes.location}`}>
                    <a
                        href='#'
                        className={`${classes['nav-link']} ${classes['nav__address-link']}`}
                        onClick={handleModalToggle}>
                        <span>Hello</span>
                        <div className={classes.content}>
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                size='sm'
                                className={classes['location-dot']}
                            />
                            <span className={classes['content-heading']}>
                                Select Your Address
                            </span>
                        </div>
                    </a>
                </div>
                <div className={classes.container}>
                    <SearchBar />
                </div>
                <div className={`${classes.container} ${classes.account}`}>
                    <a
                        href='#'
                        onMouseEnter={handleMouseOver}
                        onMouseLeave={handleMouseLeave}
                        className={`${classes['nav-link']} ${classes['nav__account-link']}`}>
                        <span>Hello, sign in</span>
                        <div className={classes.content}>
                            <span className={classes['content-heading']}>
                                Accounts & Lists
                            </span>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                size='sm'
                                className={classes['caret-down']}
                            />
                        </div>
                    </a>
                    {showNavCard && (
                        <NavItemCard
                            handleMouseOver={handleMouseOver}
                            handleMouseLeave={handleMouseLeave}
                        />
                    )}
                </div>
                <div className={`${classes.container} ${classes.orders}`}>
                    <a
                        href='#'
                        className={`${classes['nav-link']} ${classes['nav__orders-link']}`}>
                        <span>Returns</span>
                        <div className={classes.content}>
                            <span className={classes['content-heading']}>
                                & Orders
                            </span>
                        </div>
                    </a>
                </div>
                <div className={`${classes.container} ${classes.cart}`}>
                    <a href='#' className={`${classes['nav-link']}`}>
                        <div>
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                size='xs'
                                className={classes['cart-icon']}
                            />
                        </div>
                        <div>
                            <span
                                className={classes['cart-total-item']}
                                style={{ display: 'block' }}>
                                0
                            </span>
                            <span
                                className={classes['content-heading']}
                                style={{ display: 'block' }}>
                                Cart
                            </span>
                        </div>
                    </a>
                </div>
            </header>
        </>
    );
};

export default MainNavBar;
