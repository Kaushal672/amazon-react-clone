import classes from './ArrowButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const ArrowButton = function (props) {
    const handleClick = () => {
        props.onClick();
    };
    return (
        <>
            {props.direction === 'left' && (
                <button
                    onClick={handleClick}
                    type='button'
                    className={`${classes.btn} ${classes['arrow-left']}`}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        size='3x'
                        className={classes['arrow-icon']}
                    />
                </button>
            )}
            {props.direction === 'right' && (
                <button
                    onClick={handleClick}
                    type='button'
                    className={`${classes.btn} ${classes['arrow-right']}`}>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        size='3x'
                        className={classes['arrow-icon']}
                    />
                </button>
            )}
        </>
    );
};

export default ArrowButton;
