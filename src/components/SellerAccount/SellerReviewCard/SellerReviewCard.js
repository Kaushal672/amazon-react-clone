import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

import classes from './SellerReviewCard.module.css';

const SellerReviewCard = ({ item }) => {
    return (
        <div className={classes['seller-reviews__card']}>
            <FontAwesomeIcon
                className={classes['quote']}
                size='3x'
                icon={faQuoteLeft}
                style={{ color: '#397ef3' }}
            />
            <p className={classes['seller-reviews__review']}>{item.review}</p>
            <span className={classes['seller-reviews__name']}>{item.name}</span>
            <span className={classes['seller-reviews__company']}>
                {item.company}
            </span>
        </div>
    );
};

export default SellerReviewCard;
