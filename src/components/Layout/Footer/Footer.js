import { Link } from 'react-router-dom';

import classes from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={classes['footer']}>
            <div className={classes['footer-backToTop']}>
                <button
                    onClick={() => {
                        document.documentElement.scrollTop = 0;
                    }}>
                    Back to top
                </button>
            </div>
            <div className={classes['footer-row']}>
                <div className={classes['footer-col']}>
                    <span>Get to know us</span>
                    <ul className={classes['footer__links-list']}>
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Press Releases</li>
                        <li>Amazon Science</li>
                    </ul>
                </div>
                <div className={classes['footer-col']}>
                    <span>Connect with us</span>
                    <ul className={classes['footer__links-list']}>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                        <li>
                            <Link
                                preventScrollReset={true}
                                to='https://www.linkedin.com/in/kaushal-bhandary'>
                                Linked In
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={classes['footer-col']}>
                    <span>Make money with us</span>
                    <ul className={classes['footer__links-list']}>
                        <li>
                            <Link
                                preventScrollReset={true}
                                to='/seller-account'>
                                Sell on Amazon
                            </Link>
                        </li>
                        <li>Sell under Amazon Accelerator</li>
                        <li>Protect and Build Your Brand</li>
                        <li>Amazon Global Selling</li>
                        <li>Become an Affiliate</li>
                        <li>Fulfilment by Amazon</li>
                        <li>Advertise Your Products</li>
                        <li>Amazon Pay on Merchants</li>
                    </ul>
                </div>
                <div className={classes['footer-col']}>
                    <span>Let us help you</span>
                    <ul className={classes['footer__links-list']}>
                        <li>
                            <Link preventScrollReset={true} to='/account'>
                                Your Account
                            </Link>
                        </li>
                        <li>Returns Centre</li>
                        <li>100% Purchase Protection</li>
                        <li>Amazon App Download</li>
                        <li>Help</li>
                    </ul>
                </div>
            </div>
            <div className={classes['footer-end']}>
                <div className={classes['footer-end__logo']}>
                    <img
                        src={require('../../../images/amazon-logo-white.png')}
                        alt='amazon logo'
                    />
                </div>
                <span>
                    Copyright ©{new Date().getFullYear()} Amazon All rights
                    reserved
                </span>
            </div>
        </footer>
    );
};

export default Footer;
