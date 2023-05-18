import { useRef, useState } from 'react';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import classes from './SearchBar.module.css';

const SearchBar = (props) => {
    const [categoryState, setCategoryState] = useState('');
    const containerRef = useRef(null);

    const handleFocusOnInput = () => {
        containerRef.current.style['box-shadow'] = '0 0 0 2pt #ffa200';
    };
    const handleBlurOnInput = () => {
        containerRef.current.style['box-shadow'] = 'none';
    };

    const handleSelectChange = (evt) => {
        setCategoryState(evt.target.value);
    };

    return (
        <div className={classes.container}>
            <form>
                <div className={classes.controls} ref={containerRef}>
                    <div className={classes['nav-left']}>
                        <div id={classes['nav-search-dropdown-card']}>
                            <div
                                className={`${classes['nav-search-scope']} ${classes['nav-sprite']}`}>
                                <div className={classes['nav-search-facade']}>
                                    <span id={classes['nav-search-label']}>
                                        {categoryState || 'All Categories'}
                                    </span>
                                    <FontAwesomeIcon
                                        className={classes.caretDown}
                                        icon={faCaretDown}
                                        size='sm'
                                    />
                                </div>
                                <label
                                    id={classes['select-label']}
                                    htmlFor='searchDropDownBox'>
                                    Select category for your search
                                </label>
                                <select
                                    defaultValue={'All categories'}
                                    onChange={handleSelectChange}
                                    className={classes['nav-search-dropdown']}
                                    id={classes['searchDropDownBox']}>
                                    <option value='All categories'>
                                        All categories
                                    </option>
                                    <option value='dummy2'>Dummy2</option>
                                    <option value='Dummy22342342342342343242342343'>
                                        Dummy22342342342342343242342343
                                    </option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy3'>Dummy2</option>
                                    <option value='dummy4'>Dummy3</option>
                                    <option value='dummy5'>Dummy4</option>
                                    <option value='dummy6'>Dummy5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <input
                        onFocus={handleFocusOnInput}
                        onBlur={handleBlurOnInput}
                        type='search'
                        name='q'
                        placeholder='Search anything'
                    />
                    <button type='submit' className={classes['search-btn']}>
                        <FontAwesomeIcon icon={faSearch} size='xl' />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
