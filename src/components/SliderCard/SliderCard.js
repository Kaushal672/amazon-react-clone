import classes from './SliderCard.module.css';

const SliderCard = function ({ card, category }) {
    return (
        <div className={classes.card}>
            <a href='' className={classes['card-link']}></a>
            <div className={classes['product-image']}>
                <img
                    src={card.imageUrl}
                    alt={card.title}
                    className={classes['card-img']}
                />
            </div>
            <div>
                <span className={classes['discount-badge']}>
                    Up to {card.discount} off
                </span>
                <span className={classes['offer-deal']}>{category}</span>
            </div>
            <h5 className={classes['product-description']}>{card.title}</h5>
        </div>
    );
};

export default SliderCard;
