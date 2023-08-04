import { Link } from 'react-router-dom';

import classes from './SliderCard.module.css';

const SliderCard = function ({ card }) {
    return (
        <div className={classes.card}>
            <div className={classes['product-image']}>
                <img
                    src={card.images[0].url}
                    alt={card.title}
                    className={classes['card-img']}
                />
            </div>
            <div>
                <span className={classes['discount-badge']}>
                    Up to {card.discount}% off
                </span>
                <span className={classes['offer-deal']}>{card.offer}</span>
            </div>
            <Link to={`products/${card._id}`} className={classes['card-link']}>
                <h1 className={classes['product-description']}>{card.title}</h1>
            </Link>
        </div>
    );
};

export default SliderCard;
