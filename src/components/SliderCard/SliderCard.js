import classes from './SliderCard.module.css';

const SliderCard = function ({ card }) {
    return (
        <div className={classes.card}>
            <div className={classes['product-image']}>
                <img
                    src={card.imageUrl}
                    alt={card.title}
                    className={classes['card-img']}
                />
            </div>
            <div>
                <span className={classes['discount-badge']}>Up to 70% off</span>
                <span className={classes['offer-deal']}>Deal of the day</span>
            </div>
            <h5 className={classes['product-description']}>{card.title}</h5>
        </div>
    );
};

export default SliderCard;
