import classes from './Content.module.css';

const Content = function (props) {
    return <div className={classes['content-wrapper']}>{props.children}</div>;
};

export default Content;
