import { Link } from 'react-router-dom';

import ReviewStar from '../../ProductDetail/Reviews/ReviewStar/ReviewStar';
import classes from './SearchResultCard.module.css';

const SearchResultCard = ({ product }) => {
    return (
        <Link
            to={`/products/${product._id}`}
            className={classes['product__card-container']}>
            <div className={classes['product__card-img']}>
                <img src={product.images[0].url} alt={product.title} />
            </div>
            <div className={classes['product__card-content']}>
                <span className={classes['product__card-title']}>
                    {product.title}
                </span>
                <span className={classes['product__card-category']}>
                    {product.category}
                </span>
                <span className={classes['product__card-rating']}>
                    {product.rating.overallRating}
                </span>
                <ReviewStar rating={product.rating.overallRating} />
                <div className={classes['product__card-offer']}>
                    <span className={classes['product__card-price']}>
                        ₹{product.formattedPrice.toFixed(2)}
                    </span>
                    <span className={classes['product__card-original-price']}>
                        ₹{product.price.toFixed(2)}
                    </span>
                    <span className={classes['product__card-discount']}>
                        ({product.discount}% off)
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default SearchResultCard;
