import classes from './LoadingBar.module.css';

const LoadingBar = () => {
    return (
        <div className={classes['loading-bar']}>
            <div className={classes['animated-bar']}></div>
        </div>
    );
};

export default LoadingBar;
