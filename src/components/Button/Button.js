import { Link } from 'react-router-dom';

import classes from './Button.module.css';

const Button = function ({
    mode = 'button',
    type,
    children,
    onClick = () => {},
    disabled = false,
    to = '',
    value = '',
    name = '',
}) {
    return (
        <>
            {mode === 'button' && (
                <button
                    value={value}
                    name={name}
                    disabled={disabled}
                    type={type || 'button'}
                    className={classes.btn}
                    onClick={() => onClick()}>
                    {children}
                </button>
            )}
            {mode === 'link' && (
                <Link to={to} className={classes.btn} onClick={() => onClick()}>
                    {children}
                </Link>
            )}
        </>
    );
};

export default Button;
