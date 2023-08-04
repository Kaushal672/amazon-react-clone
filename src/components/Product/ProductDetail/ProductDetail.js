import BuyCard from './BuyCard/BuyCard';
import FBABadge from './FBABadge/FBABadge';
import ImageContainer from './ImageContainer/ImageContainer';
import Reviews from './Reviews/Reviews';
import MobileImageCarousel from './MobileIImageCarousel/MobileImageCarousel';
import ReviewStar from './Reviews/ReviewStar/ReviewStar';
import classes from './ProductDetail.module.css';

const ProductDetail = ({ product }) => {
    const {
        _id,
        title,
        discount,
        price,
        images,
        description,
        formattedPrice,
        seller,
        rating,
    } = product;

    return (
        <>
            <div className={classes['product-container']}>
                <ImageContainer images={images} />
                <MobileImageCarousel images={images} />
                <div className={classes.content}>
                    <div className={classes['product-heading']}>
                        <h2 className={classes.title}>{title}</h2>
                        <span className={classes['overall-rating']}>
                            {rating.overallRating}{' '}
                        </span>
                        <ReviewStar rating={rating.overallRating} size={15} />
                    </div>
                    <div className={classes['product-offer']}>
                        <span className={classes.discount}>-{discount}%</span>
                        <span className={classes.price}>
                            ₹{formattedPrice.toLocaleString()}
                        </span>
                        <p>Inclusive of all taxes</p>
                        <FBABadge />
                    </div>
                    <div className={classes['product-specs']}>
                        <h3>Product specification</h3>
                        <ul className={classes['specification-lists']}>
                            {description.split('. ').map((el, i) => (
                                <li
                                    key={i}
                                    className={classes['specification-list']}>
                                    {el}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <BuyCard
                    originalPrice={price}
                    formattedPrice={formattedPrice}
                    id={_id}
                    company={seller.company}
                />
            </div>
            <Reviews rating={rating} />
        </>
    );
};

export default ProductDetail;
