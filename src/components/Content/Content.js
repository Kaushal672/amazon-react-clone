import { Outlet } from 'react-router-dom';

import classes from './Content.module.css';

const Content = function () {
    return (
        <div className={classes['content-wrapper']} id='contents'>
            <Outlet />
        </div>
    );
};

export default Content;
