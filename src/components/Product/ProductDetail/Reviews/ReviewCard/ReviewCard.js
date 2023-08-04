import { Form, Link } from 'react-router-dom';
import useOutsideClick from '../../../../../hooks/use-outside-click';

import ReviewStar from '../ReviewStar/ReviewStar';
import classes from './ReviewCard.module.css';

const ReviewCard = ({ review, userId }) => {
    const { ref, isComponentVisible, setIsComponentVisible } =
        useOutsideClick(false);

    return (
        <div className={classes['review__card']}>
            <div className={classes['review__card-heading']}>
                <div className={classes['review__card-user']}>
                    <img src={review.author.avatar.url} alt='user avatar' />
                    <h4>{review.author.username}</h4>
                </div>
                <div
                    className={classes['review__card-actions']}
                    ref={ref}
                    onClick={() => setIsComponentVisible(true)}>
                    <span>&#10247;</span>
                    {isComponentVisible && (
                        <Form className={classes['dropdown']} method='DELETE'>
                            <input
                                type='text'
                                name='reviewId'
                                defaultValue={review._id}
                                hidden={true}
                            />
                            <div className={classes['form-actions']}>
                                {userId === review.author._id && (
                                    <button
                                        name='intent'
                                        value={'delete-review'}
                                        type='submit'>
                                        Delete
                                    </button>
                                )}
                                {userId !== review.author._id && (
                                    <Link to=''>Report abuse</Link>
                                )}
                            </div>
                        </Form>
                    )}
                </div>
            </div>
            <div className={classes['review__card-body']}>
                <ReviewStar rating={review.rating} size={15} />
                <p>{review.body}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
