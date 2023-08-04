import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import ReviewStar from './ReviewStar/ReviewStar';
import ReviewMeter from './ReviewMeter/ReviewMeter';
import Button from '../../../Button/Button';
import ReviewForm from './ReviewForm/ReviewForm';
import ReviewCard from './ReviewCard/ReviewCard';
import classes from './Reviews.module.css';

const ratingPercentageCalc = (reviews) => {
    const map = Array(5).fill(0);
    reviews.forEach((el) => {
        map[el.rating - 1]++;
    });

    if (reviews.length === 0) {
        return map;
    }

    for (let i = 1; i <= 5; i++) {
        map[i - 1] = Math.floor((map[i - 1] * 100) / reviews.length);
    }

    return map;
};

const Reviews = ({ rating }) => {
    const [showForm, setShowForm] = useState(false);
    const userId = useSelector((state) => state.auth.userId);

    const ratingPercentage = useMemo(
        () => ratingPercentageCalc(rating.reviews),
        [rating.reviews]
    );

    return (
        <div className={classes['reviews-container']}>
            <div className={classes['reviews-actions-section']}>
                <div className={classes['review-summary-container']}>
                    <h3>Customer Reviews</h3>
                    <ReviewStar rating={rating.overallRating} />
                    <span>{rating.overallRating} out of 5</span>
                    <table className={classes['star-meter-cotainer']}>
                        <tbody>
                            {[...Array(5)].map((_, i) => (
                                <ReviewMeter
                                    key={i}
                                    rate={5 - i}
                                    percentage={ratingPercentage[5 - i - 1]}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                {userId && (
                    <div className={classes['write-review']}>
                        <h4>Review this product</h4>
                        {!showForm && (
                            <>
                                <p className={classes['customer-review-text']}>
                                    Share your thoughts with other customers
                                </p>
                                <Button onClick={() => setShowForm(true)}>
                                    Write a product review
                                </Button>
                            </>
                        )}
                        {showForm && (
                            <ReviewForm onCancel={() => setShowForm(false)} />
                        )}
                    </div>
                )}
            </div>
            <div className={classes['reviews__container']}>
                {rating.reviews.length < 1 && (
                    <h2>No rating for this product yet.</h2>
                )}

                {rating.reviews.length >= 1 && (
                    <>
                        <h3 className={classes['review-heading']}>
                            Top Reviews
                        </h3>
                        {rating.reviews.slice(0, 10).map((el) => (
                            <ReviewCard
                                key={el._id}
                                review={el}
                                userId={userId}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Reviews;
