import { Link } from 'react-router-dom';

import classes from './Card.module.css';

const Card = ({ title, img }) => {
    return (
        <div className={classes.card}>
            <h2 className={classes.title}>{title}</h2>
            <img src={img} alt={title} className={classes['card-image']} />
            <Link to={`/`} className={classes.btn}>
                See more
            </Link>
        </div>
    );
};

export default Card;
