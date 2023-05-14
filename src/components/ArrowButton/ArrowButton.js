import classes from './ArrowButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const ArrowButton = function ({ direction, onClick, style = {} }) {
    return (
        <>
            {direction === 'left' && (
                <button
                    onClick={onClick}
                    type='button'
                    className={`${classes.btn} ${classes['arrow-left']}`}
                    style={style}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        size='3x'
                        className={classes['arrow-icon']}
                    />
                </button>
            )}
            {direction === 'right' && (
                <button
                    onClick={onClick}
                    type='button'
                    className={`${classes.btn} ${classes['arrow-right']}`}
                    style={style}>
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
