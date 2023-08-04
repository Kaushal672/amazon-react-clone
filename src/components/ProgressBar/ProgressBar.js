import classes from './ProgressBar.module.css';

const ProgressBar = ({ file: { progress = 0, name }, id }) => {
    return (
        <>
            <style>{`
            #progress-bar-${id}:after {
                width:${progress === undefined ? 0 : progress}%;
                background-color:blue;
            }
            `}</style>
            <span className={classes.container}>
                <span className={classes.filename}>{name}</span>
                <div
                    className={classes.Loading}
                    id={`progress-bar-${id}`}></div>
                <span className={classes.percentage}>{progress}%</span>
            </span>
        </>
    );
};

export default ProgressBar;
