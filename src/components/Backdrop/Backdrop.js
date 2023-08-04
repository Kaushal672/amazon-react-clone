import classes from './Backdrop.module.css';

const Backdrop = ({ onConfirm }) => {
    return <div className={classes.backdrop} onClick={onConfirm}></div>;
};

export default Backdrop;
