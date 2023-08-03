import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import classes from './ArrowButton.module.css';

const ArrowButton = function ({
    direction,
    onClick,
    style = {},
    disabled = false,
}) {
    return (
        <>
            {direction === 'left' && (
                <button
                    aria-label='arrow left'
                    disabled={disabled}
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
                    aria-label='arrow right'
                    disabled={disabled}
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
