import Button from '../Button/Button';
import classes from './ModalCard.module.css';

const ModalCard = ({ style, title, children, onConfirm }) => {
    return (
        <div id='c' className={classes.modal}>
            <header className={classes.header}>
                <h4 style={style}>{title}</h4>
            </header>
            <div className={classes['modal-content']}>{children}</div>
            <footer className={classes.footer}>
                <Button onClick={onConfirm}>Close</Button>
            </footer>
        </div>
    );
};

export default ModalCard;
