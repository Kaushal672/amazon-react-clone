import classes from './SellerCard.module.css';

const SellerCard = ({ item }) => {
    return (
        <div className={classes['seller-card__wrapper']}>
            <img
                src={item.image}
                alt='seller card logo'
                className={classes['seller-card__img']}
            />
            <h2 className={classes['seller-card__title']}>{item.title}</h2>
            <p className={classes['seller-card__description']}>
                {item.description}
            </p>
        </div>
    );
};

export default SellerCard;
