import classes from './Card.module.css';

const Card = (props) => {
    return (
        <div className={classes.card}>
            <h2 className={classes.title}>{props.title}</h2>
            <img
                src={props.img}
                alt={props.title}
                className={classes['card-image']}
            />
            <a href='#' className={classes.btn}>
                See more
            </a>
        </div>
    );
};

export default Card;
