import { useState, useEffect } from 'react';

import Button from '../Button/Button';
import SellerAccountForm from './SellerAccountForm/SellerAccountForm';
import SellerCard from './SellerCard/SellerCard';
import SellerReviewCard from './SellerReviewCard/SellerReviewCard';
import ProductCard from './ProductCard/ProductCard';
import classes from './SellerAccount.module.css';

const sellCardDetails = [
    {
        title: 'Sell on Amazon',
        description:
            "Join our family of 10 Lakh+ businesses who sell on Amazon.in. Sell your products on India's most visited shopping destination.",
        image: require('../../images/amazon-smile.png'),
    },
    {
        title: 'Benefits of selling on Amazon',
        description:
            "Put your products in front of over 300 million customers worldwide and deliver to 100% of India's serviceable pincodes.",
        image: require('../../images/amazon-delivery.png'),
    },
    {
        title: 'Fee and payments',
        description:
            'Amazon ensures your payments are deposited directly in your bank account within 7-14 days.',
        image: require('../../images/coin-hand.png'),
    },
];

const sellerReviews = [
    {
        name: 'Priya Tyagi',
        review: 'Since last year, my business on Amazon has grown more than 9 times',
        company: 'Tied Ribbons (Amazon Seller)',
    },
    {
        name: 'Adithya',
        review: 'Amazon is the best thing happened in my life. My buisness is blooming more than ever.',
        company: 'Tech Gadgets Galore',
    },
];

const SellerAccount = ({ seller }) => {
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!seller.seller)
            document.getElementById('contents').style.maxWidth = '100vw';
        return () => {
            const el = document.getElementById('contents');
            if (el) el.style.maxWidth = '1500px';
        };
    }, [seller]);

    return (
        <>
            {seller.seller && (
                <div className={classes['seller__details']}>
                    <section className={classes['seller__details-add-product']}>
                        <div className={classes['seller__details-add-card']}>
                            <img
                                className={classes['seller__details-img']}
                                src={require('../../images/product.png')}
                                alt='seller card add product'
                            />
                            <div className={classes['seller__details-slogan']}>
                                <h2>
                                    Show case your product to millions of
                                    customer now!
                                </h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Excepturi officia quaerat
                                    quas similique doloremque odio. Eaque soluta
                                    quibusdam facere libero animi labore nulla
                                    nam a. Quas voluptatum quia et consequuntur!
                                </p>
                            </div>
                            <Button mode='link' to='/products/new'>
                                Add Product
                            </Button>
                        </div>
                    </section>
                    <section className={classes['seller__details-products']}>
                        {seller.products.length === 0 && (
                            <h2 style={{ textAlign: 'center' }}>
                                No Products yet!!
                            </h2>
                        )}
                        {seller.products.length > 0 && (
                            <>
                                <h2>Your Products</h2>
                                {seller.products.map((prod) => (
                                    <ProductCard
                                        key={prod._id}
                                        product={prod}
                                    />
                                ))}
                            </>
                        )}
                    </section>
                </div>
            )}
            {!seller.seller && (
                <section
                    id='seller-wrapper'
                    className={classes['seller-account__container']}>
                    <div className={classes['seller-register']}>
                        <div className={classes['seller-register__container']}>
                            <h2>
                                Not a seller? Become a seller with one click.
                            </h2>
                            {!showForm && (
                                <div
                                    className={
                                        classes['seller-register__button']
                                    }>
                                    <Button
                                        onClick={() => {
                                            setShowForm(true);
                                        }}>
                                        Start selling
                                    </Button>
                                </div>
                            )}
                        </div>
                        {!showForm && (
                            <div className={classes['sell-detail__container']}>
                                <div
                                    className={`${classes['seller-banner__content']} ${classes['seller-banner__padding']}`}>
                                    <div
                                        className={
                                            classes['seller-banner__detail']
                                        }>
                                        <span>Limited time offer</span>
                                        <h2
                                            className={
                                                classes['banner-heading']
                                            }>
                                            Become a Seller on Amazon
                                        </h2>
                                        <p
                                            className={
                                                classes[
                                                    'seller-banner__detail-para'
                                                ]
                                            }>
                                            Sell to crores of customers with 50%
                                            off on Selling Fee* on Amazon.in
                                        </p>
                                        {!showForm && (
                                            <div
                                                className={`${classes['seller-register__button']} ${classes['seller-banner__button']}`}>
                                                <Button
                                                    onClick={() => {
                                                        setShowForm(true);
                                                    }}>
                                                    Start selling
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className={
                                            classes['seller-banner__img']
                                        }>
                                        <img
                                            src={require('../../images/50_offer_May.webp')}
                                            alt='seller banner offer'
                                        />
                                    </div>
                                </div>
                                <div
                                    className={`${classes['sell-cards__container']} ${classes['seller-banner__padding']}`}>
                                    <h2 className={classes['banner-heading']}>
                                        Why sell on Amazon?
                                    </h2>
                                    <div
                                        className={
                                            classes['sell-cards__wrapper']
                                        }>
                                        {sellCardDetails.map((item, i) => (
                                            <SellerCard key={i} item={item} />
                                        ))}
                                    </div>
                                </div>
                                <div
                                    className={`${classes['seller-reviews']} ${classes['seller-banner__padding']}`}>
                                    <h2 className={classes['banner-heading']}>
                                        See What other Sellers say about Amazon?
                                    </h2>
                                    {sellerReviews.map((el, i) => (
                                        <SellerReviewCard
                                            key={i}
                                            item={el}></SellerReviewCard>
                                    ))}
                                </div>
                                <section
                                    className={`${classes['sell-detail__end-card']} ${classes['seller-banner__padding']}`}>
                                    <div
                                        className={
                                            classes['sell-card__end-content']
                                        }>
                                        <h2
                                            className={
                                                classes['banner-heading']
                                            }>
                                            Start selling today
                                        </h2>
                                        <p
                                            className={
                                                classes[
                                                    'seller-banner__detail-para'
                                                ]
                                            }>
                                            Put your products in front of more
                                            than 300 million customers worldwide
                                        </p>
                                        <div
                                            className={`${classes['seller-register__button']} ${classes['seller-banner__button']}`}>
                                            <Button
                                                onClick={() => {
                                                    setShowForm(true);
                                                }}>
                                                Start selling
                                            </Button>
                                        </div>
                                    </div>
                                    <img
                                        className={
                                            classes['sell-card__end-img']
                                        }
                                        src={require('../../images/Shipping.png')}
                                        alt='seller card shipping'
                                    />
                                </section>
                            </div>
                        )}
                        {showForm && (
                            <section className={classes['register-form']}>
                                <SellerAccountForm
                                    onCancel={() => {
                                        setShowForm(false);
                                    }}
                                />
                            </section>
                        )}
                    </div>
                </section>
            )}
        </>
    );
};

export default SellerAccount;
