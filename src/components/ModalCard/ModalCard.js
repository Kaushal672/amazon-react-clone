import Button from '../Button/Button';
import classes from './ModalCard.module.css';

const ModalCard = (props) => {
    return (
        <div className={classes.modal}>
            <header className={classes.header}>
                <h4>{props.title}</h4>
            </header>
            <div className={classes['modal-content']}>{props.children}</div>
            <footer className={classes.footer}>
                <Button onClick={props.onConfirm}>Close</Button>
            </footer>
        </div>
    );
};

export default ModalCard;
