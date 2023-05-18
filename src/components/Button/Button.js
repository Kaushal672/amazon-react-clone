import classes from './Button.module.css';

const Button = function ({ type, children, onClick = () => {} }) {
    return (
        <button
            type={type || 'button'}
            className={classes.btn}
            onClick={() => onClick()}>
            {children}
        </button>
    );
};

export default Button;
