import star from '../../../../../images/empty-star.png';
import classes from './ReviewStar.module.css';

const ReviewStar = ({ rating = 0, size = 20 }) => {
    const emptyStars = 5 - Math.ceil(rating);
    const fullStars = Math.floor(rating);
    let halfStar = +(rating % 1).toFixed(1) * 10;
    let transparency = (100 - halfStar * 10 * 2) / 2;
    transparency = transparency < 0 ? 0 : transparency;

    const css = `
        #star-${size}  {
            width: ${size}px;
            height:${size}px;
        }
    `;
    return (
        <span>
            <style>{css}</style>
            <div className={classes['star-container']}>
                {[...Array(fullStars)].map((_, i) => (
                    <span
                        key={i}
                        className={`${classes['full-star']} ${classes['star']}`}>
                        <img src={star} alt='review star' id={`star-${size}`} />
                    </span>
                ))}
                {halfStar > 0 && (
                    <span className={classes['star']}>
                        <img
                            id={`star-${size}`}
                            src={star}
                            alt='review star'
                            style={{
                                backgroundImage: `linear-gradient(to right, orange ${
                                    halfStar * 10
                                }%, transparent ${
                                    halfStar * 10
                                }%, transparent ${transparency}%, transparent ${transparency}%)`,
                            }}
                        />
                    </span>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={i} className={classes['star']}>
                        <img src={star} alt='review star' id={`star-${size}`} />
                    </span>
                ))}
            </div>
        </span>
    );
};

export default ReviewStar;
