import { Link, useFetcher } from 'react-router-dom';
import ReactDOM from 'react-dom';

import WhiteBackdrop from '../../Backdrop/WhiteBackdrop/WhiteBackdrop';
import ReviewStar from '../../Product/ProductDetail/Reviews/ReviewStar/ReviewStar';
import Button from '../../Button/Button';
import classes from './ProductCard.module.css';

const ProductCard = ({ product }) => {
    const { Form, state } = useFetcher();

    return (
        <div className={classes['product__card-wrapper']}>
            {state !== 'idle' &&
                ReactDOM.createPortal(
                    <WhiteBackdrop />,
                    document.getElementById('nav-backdrop-root')
                )}
            <div className={classes['product__card-img']}>
                <img src={product.images[0].url} alt={product.title} />
            </div>
            <div className={classes['product__card-content']}>
                <Link to={`/products/${product._id}`}>
                    <h4 className={classes['product__card-title']}>
                        {product.title}
                    </h4>
                </Link>
                <div>
                    <span className={classes['product__card-discount']}>
                        {product.discount}
                    </span>
                    <span className={classes['product__card-price']}>
                        {product.formattedPrice}
                    </span>
                </div>
                <div className={classes['rating']}>
                    <span className={classes['overall-rating']}>
                        {product.rating.overallRating}{' '}
                    </span>
                    <ReviewStar rating={product.rating.overallRating} />
                </div>
                <div className={classes['product__card-actions']}>
                    <Button to={`/products/${product._id}/edit`} mode='link'>
                        Edit
                    </Button>
                    <Form
                        action={`/products/${product._id}?index`}
                        method='DELETE'>
                        <Button
                            name='intent'
                            value='delete-product'
                            type='submit'>
                            Delete
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
