import classes from './ReviewMeter.module.css';

const ReviewMeter = ({ rate, percentage }) => {
    const css = `
        #rating-${rate}::before {
            width: ${percentage}%;
        }
    `;
    return (
        <>
            <style>{css}</style>
            <tr className={classes.tr}>
                <td className={`${classes['review-context']} ${classes['td']}`}>
                    {rate} star
                </td>
                <td className={classes['td']}>
                    <span
                        className={classes['review-meter']}
                        id={`rating-${rate}`}></span>
                </td>
                <td className={`${classes['review-context']} ${classes['td']}`}>
                    {percentage}%
                </td>
            </tr>
        </>
    );
};

export default ReviewMeter;
