import classes from './FBABadge.module.css';

const FBABadge = ({ className }) => {
    return (
        <span className={`${classes.badge} ${className}`}>
            <img
                src={require('../../../../images/amazon-small-logo.png')}
                alt='amazon small logo'
            />
            Fulfilled
        </span>
    );
};

export default FBABadge;
