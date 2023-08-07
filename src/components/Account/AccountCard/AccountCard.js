import { Link } from 'react-router-dom';

import classes from './AccountCard.module.css';

const AccountCard = ({ img, path, title, description }) => {
    return (
        <Link to={path} className={classes['account-card__container']}>
            <img
                src={img}
                alt='account card'
                className={classes['account-card__img']}
            />
            <div className={classes['account-card__content']}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </Link>
    );
};

export default AccountCard;
